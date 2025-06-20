import csv
import random

# Define the number of random RGB values to generate
num_rows = 100

# Define the header for the CSV file
header = ["red", "green", "blue"]

# Generate the random RGB values and write them to a CSV file
with open('study1.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    
    # Write the header
    writer.writerow(header)
    
    # Write the data rows
    for _ in range(num_rows):
        writer.writerow([random.randint(0, 255) for _ in range(3)])

print(f"Successfully generated random_rgb.csv with {num_rows} rows.")
