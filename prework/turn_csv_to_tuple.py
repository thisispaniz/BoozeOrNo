import csv

# Path to your CSV file
csv_file_path = 'medications_alcohol_interactions_detailed.csv'

# List to hold the tuples
sample_data = []

# Read the CSV file
with open(csv_file_path, mode='r', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    
    for row in reader:
        # Extract the required columns and handle None or empty values
        symptoms_disorders = row['symptoms_disorders '].strip() if row['symptoms_disorders '].strip() else 'No Symptoms/Disorders'
        medication_brand = row[' medication_brand '].strip() if row[' medication_brand '].strip() else 'No Brand'
        active_ingredient = row[' active_ingredient '].strip() if row[' active_ingredient '].strip() else 'No Active Ingredient'
        alcohol_interaction = row[' alcohol_interaction'].strip() if row[' alcohol_interaction'] and row[' alcohol_interaction'].strip() else 'No Interaction Information'
        
        # Create a tuple and append to the list
        sample_data.append((
            symptoms_disorders,
            medication_brand,
            active_ingredient,
            alcohol_interaction
        ))

# Print or use the data
#for item in sample_data:
    print(sample_data)
