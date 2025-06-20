import pandas as pd
from PIL import Image, ImageDraw
import zipfile
import io
import os

def generate_dot_images():
    """
    Reads RGB data from 'study1.csv', generates high-resolution images for each unique
    dot stimulus, and saves them into a zip file.
    """
    # Define the expected path for the uploaded file
    file_path = 'study1.csv'
    
    try:
        # Check if the file exists before attempting to load it
        if not os.path.exists(file_path):
            print(f"Error: The file '{file_path}' was not found in the current directory.")
            # Let's list the files to see what is available, for debugging.
            print("Files in current directory:", os.listdir('.'))
            return

        # Load the dataset
        print(f"Loading data from '{file_path}'...")
        df = pd.read_csv(file_path)

        # Get unique RGB combinations
        unique_colors_df = df[['red', 'green', 'blue']].drop_duplicates()
        print(f"Found {len(unique_colors_df)} unique colors. Generating images...")

        # Define image properties
        img_size = (1024, 1024)  # High resolution
        background_color = (255, 255, 255)  # White background
        dot_radius = 400 # Radius of the dot in pixels

        # Prepare for zipping in memory
        zip_buffer = io.BytesIO()
        
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            # Loop through each unique color and create an image
            for index, row in unique_colors_df.iterrows():
                r, g, b = int(row['red']), int(row['green']), int(row['blue'])
                
                # Create a new image with a white background
                img = Image.new('RGB', img_size, background_color)
                draw = ImageDraw.Draw(img)

                # Calculate the bounding box for a centered circle
                x0 = (img_size[0] - dot_radius * 2) / 2
                y0 = (img_size[1] - dot_radius * 2) / 2
                x1 = x0 + dot_radius * 2
                y1 = y0 + dot_radius * 2
                bounding_box = [x0, y0, x1, y1]

                # Draw the dot with the specified color
                draw.ellipse(bounding_box, fill=(r, g, b))

                # Save the image to an in-memory buffer
                img_buffer = io.BytesIO()
                img.save(img_buffer, format='PNG')
                img_buffer.seek(0) # Rewind the buffer

                # Define a descriptive filename
                filename = f'dot_{r}-{g}-{b}.png'
                
                # Write the image from the buffer into the zip file
                zip_file.writestr(filename, img_buffer.getvalue())

        # Save the zip file from the buffer to disk
        zip_filename = 'dot_stimuli.zip'
        with open(zip_filename, 'wb') as f:
            f.write(zip_buffer.getvalue())
            
        print(f"\nSuccessfully generated and saved {len(unique_colors_df)} images to '{zip_filename}'")
        print("You can now download the zip file containing all the dot images.")

    except Exception as e:
        print(f"An unexpected error occurred: {e}")

# --- Execute the function ---
if __name__ == "__main__":
    generate_dot_images()
