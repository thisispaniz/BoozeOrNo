import sqlite3
from pathlib import Path

# Define the path to the app directory and database
app_path = Path(__file__).parent
db_path = app_path / 'alcohol_interaction_data.db'

# Connect to the database
conn = sqlite3.connect(db_path, check_same_thread=False)
cursor = conn.cursor()

# SQL command to create the 'alcmedi' table if it doesn't exist
create_table_sql = """
CREATE TABLE IF NOT EXISTS alcmedi (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symptoms_disorders TEXT,
    medication_brand TEXT,
    active_ingredient TEXT,
    alcohol_interaction TEXT
) """

# Execute the SQL command
cursor.execute(create_table_sql)


# SQL commands to insert sample data
insert_data_sql = """
INSERT INTO alcmedi (symptoms_disorders, medication_brand, active_ingredient, alcohol_interaction)
VALUES (?, ?, ?, ?)
"""

# Sample data
sample_data = [

('Allergies / Colds / Flu', 'Alavert', 'Loratadine', 'Drowsiness'),
('Allergies / Colds / Flu', 'Atarax', 'Hydroxyzine', 'Dizziness; increased risk for overdose'),
('Allergies / Colds / Flu', 'Benadryl', 'Diphenhydramine', 'Increased risk for overdose'),
('Allergies / Colds / Flu', 'Clarinex', 'Desloratadine', 'none'),
('Allergies / Colds / Flu', 'Claritin', 'Loratadine', 'none'),
('Allergies / Colds / Flu', 'Claritin-D', 'Loratadine + Pseudoephedrine', 'none'),
('Allergies / Colds / Flu', 'Dimetapp', 'Brompheniramine', 'none'),
('Allergies / Colds / Flu', 'Sudafed', 'Chlorpheniramine', 'none'),
('Allergies / Colds / Flu', 'Triaminic Cold & Allergy', 'Chlorpheniramine', 'none'),
('Allergies / Colds / Flu', 'Tylenol Allergy Sinus', 'Chlorpheniramine', 'none'),
('Allergies / Colds / Flu', 'Tylenol Cold & Flu', 'Chlorpheniramine', 'none'),
('Allergies / Colds / Flu', 'Zyrtec', 'Cetirizine', 'none'),
('Angina / Coronary Heart Disease', 'Isordil', 'Isosorbide', 'Rapid heartbeat; sudden changes in blood pressure; dizziness; fainting'),
('Angina / Coronary Heart Disease', 'none', 'Nitroglycerin', 'Rapid heartbeat; sudden changes in blood pressure; dizziness; fainting'),
('Anxiety and Epilepsy', 'Ativan', 'Lorazepam', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Anxiety and Epilepsy', 'BuSpar', 'Buspirone', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Anxiety and Epilepsy', 'Klonopin', 'Clonazepam', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Anxiety and Epilepsy', 'Librium', 'Chlordiazepoxide', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Anxiety and Epilepsy', 'Paxil', 'Paroxetine', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Anxiety and Epilepsy', 'Valium', 'Diazepam', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Anxiety and Epilepsy', 'Xanax', 'Alprazolam', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Arthritis', 'Celebrex', 'Celecoxib', 'Ulcers / stomach bleeding / liver damage'),
('Arthritis', 'Naprosyn', 'Naproxen', 'Ulcers / stomach bleeding / liver damage'),
('Arthritis', 'Voltaren', 'Diclofenac', 'Ulcers / stomach bleeding / liver damage'),
('Attention and Concentration (ADHD)', 'Adderall', 'Amphetamine/Dextroamphetamine', 'Dizziness / drowsiness / impaired concentration / possible increased risk for heart problems'),
('Attention and Concentration (ADHD)', 'Concerta', 'Methylphenidate', 'Dizziness / drowsiness / impaired concentration / possible increased risk for heart problems'),
('Attention and Concentration (ADHD)', 'Ritalin', 'Methylphenidate', 'SDizziness / drowsiness / impaired concentration / possible increased risk for heart problems'),
('Attention and Concentration (ADHD)', 'Dexedrine', 'Dextroamphetamine', 'Dizziness / drowsiness / impaired concentration / possible increased risk for heart problems'),
('Attention and Concentration (ADHD)', 'Focalin', 'Dexmethylphenidate', 'Dizziness / drowsiness / impaired concentration / possible increased risk for heart problems'),
('Attention and Concentration (ADHD)', 'Strattera', 'Atomoxetine', 'Liver damage'),
('Attention and Concentration (ADHD)', 'Vyvanse', 'Lisdexamfetamine', 'Liver damage'),
('Blood Clots', 'Coumadin', 'Warfarin', 'Occasional drinking may lead to internal bleeding; heavier drinking may cause more bleeding or the opposite (risk of clots / strokes / heart attacks)'),
('Cough', 'Delsym', 'Dextromethorphan', 'Drowsiness / dizziness / increased risk for overdose'),
('Cough', 'Robitussin Cough', 'Dextromethorphan', 'Drowsiness / dizziness / increased risk for overdose'),
('Cough', 'Robitussin A-C', 'Guaifenesin + Codeine', 'Drowsiness / dizziness / increased risk for overdose'),
('Depression', 'Abilify', 'Aripiprazole', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Anafranil', 'Clomipramine', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Celexa', 'Citalopram', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Clozaril', 'Clozapine', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Cymbalta', 'Duloxetine', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness; liver damage'),
('Depression', 'Desyrel', 'Trazodone', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Effexor', 'Venlafaxine', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Elavil', 'Amitriptyline', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Geodon', 'Ziprasidone', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Invega', 'Paliperidone', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Lexapro', 'Escitalopram', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Luvox', 'Fluvoxamine', 'Drowsiness / dizziness; increased risk for overdose; increased feelings of depression / hopelessness'),
('Depression', 'Nardil', 'Phenelzine (MAOI)', 'Serious heart-related side effects / dangerously high blood pressure when mixed with tyramine (found in beer / red wine)'),
('Depression', 'Norpramin', 'Desipramine', 'Serious heart-related side effects / dangerously high blood pressure when mixed with tyramine (found in beer / red wine)'),
('Depression', 'Parnate', 'Tranylcypromine (MAOI)', 'Serious heart-related side effects / dangerously high blood pressure when mixed with tyramine (found in beer / red wine); avoid tyramine and alcohol combination'),
('Depression', 'Paxil', 'Paroxetine', 'Serious heart-related side effects / dangerously high blood pressure when mixed with tyramine (found in beer / red wine)'),
('Depression', 'Pristiq', 'Desvenlafaxine', 'Serious heart-related side effects / dangerously high blood pressure when mixed with tyramine (found in beer / red wine)'),
('Depression', 'Prozac', 'Fluoxetine', 'Serious heart-related side effects / dangerously high blood pressure when mixed with tyramine (found in beer / red wine)'),
('Depression', 'Remeron', 'Mirtazapine', 'Impaired motor control'),
('Depression', 'Risperdal', 'Risperidone', 'Impaired motor control'),
('Depression', 'Seroquel', 'Quetiapine', 'Impaired motor control'),
('Depression', 'Serzone', 'Nefazodone', 'Impaired motor control'),
('Depression', 'Symbyax', 'Fluoxetine / Olanzapine', 'Impaired motor control'),
('Depression', 'Wellbutrin', 'Bupropion', 'Increased effect of alcohol'),
('Depression', 'Zoloft', 'Sertraline', 'Increased effect of alcohol'),
('Depression', 'Zyprexa', 'Olanzapine', 'Increased effect of alcohol'),
('Depression', 'St. John’s Wort (Herbal)', 'none', 'Can interact with alcohol and other medications; increased drowsiness and side effects'),
('Diabetes', 'Diabinese', 'Chlorpropamide', 'Abnormally low blood sugar / flushing reaction (nausea / vomiting / headache / rapid heartbeat / sudden BP changes)'),
('Diabetes', 'Glucotrol', 'Glipizide', 'Abnormally low blood sugar / flushing reaction (nausea / vomiting / headache / rapid heartbeat / sudden BP changes)'),
('Diabetes', 'Glucophage', 'Metformin', 'Nausea and weakness symptoms may occur'),
('Diabetes', 'Glynase / DiaBeta / Micronase', 'Glyburide', 'Abnormally low blood sugar / flushing reaction (nausea / vomiting / headache / rapid heartbeat / sudden BP changes)'),
('Diabetes', 'Orinase', 'Tolbutamide', 'Abnormally low blood sugar / flushing reaction (nausea / vomiting / headache / rapid heartbeat / sudden BP changes)'),
('Diabetes', 'Tolinase', 'Tolazamide', 'Abnormally low blood sugar / flushing reaction (nausea / vomiting / headache / rapid heartbeat / sudden BP changes)'),
('Enlarged Prostate', 'Cardura', 'Doxazosin', 'Dizziness / light-headedness / fainting'),
('Enlarged Prostate', 'Flomax', 'Tamsulosin', 'Dizziness / light-headedness / fainting'),
('Enlarged Prostate', 'Hytrin', 'Terazosin', 'Dizziness / light-headedness / fainting'),
('Enlarged Prostate', 'Minipress', 'Prazosin', 'Dizziness / light-headedness / fainting'),
('Heartburn / Indigestion / Sour Stomach', 'Axid', 'Nizatidine', 'none'),
('Heartburn / Indigestion / Sour Stomach', 'Reglan', 'Metoclopramide', 'Rapid heartbeat; increased alcohol effect; sudden changes in blood pressure'),
('Heartburn / Indigestion / Sour Stomach', 'Tagamet', 'Cimetidine', 'none'),
('Heartburn / Indigestion / Sour Stomach', 'Zantac', 'Ranitidine', 'none'),
('High Blood Pressure', 'Accupril', 'Quinapril', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Calan', 'Verapamil', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Capozide', 'Hydrochlorothiazide', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Cardura', 'Doxazosin', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Catapres', 'Clonidine', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Cozaar', 'Losartan', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Hytrin', 'Terazosin', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Lopressor HCT', 'Hydrochlorothiazide', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Lotensin', 'Benzapril', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Minipress', 'Prazosin', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Norvasc', 'Amlodipine mesylate', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Prinivil / Zestril', 'Lisinopril', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Blood Pressure', 'Vaseretic', 'Enalapril', 'Dizziness / fainting / drowsiness; possible heart problems (e.g. arrhythmia)'),
('High Cholesterol', 'Advicor', 'Lovastatin + Niacin', 'Liver damage (all); increased flushing and itching (niacin)'),
('High Cholesterol', 'Altocor / Mevacor', 'Lovastatin', 'Liver damage'),
('High Cholesterol', 'Crestor', 'Rosuvastatin', 'Liver damage'),
('High Cholesterol', 'Lipitor', 'Atorvastatin', 'Liver damage'),
('High Cholesterol', 'Niaspan', 'Niacin', 'Flushing / itching'),
('High Cholesterol', 'Pravachol', 'Pravastatin', 'Liver damage'),
('High Cholesterol', 'Pravigard™', 'Pravastatin + Aspirin', 'Liver damage; increased stomach bleeding'),
('High Cholesterol', 'Vytorin™', 'Ezetimibe + Simvastatin', 'Liver damage'),
('High Cholesterol', 'Zocor', 'Simvastatin', 'Liver damage'),
('Infections', 'Acrodantin', 'Nitrofurantoin', 'Fast heartbeat; sudden BP changes'),
('Infections', 'Flagyl', 'Metronidazole', 'Stomach pain / vomiting / headache / flushing/redness of the face'),
('Infections', 'Grisactin', 'Griseofulvin', 'Stomach pain / vomiting / headache / flushing/redness of the face'),
('Infections', 'Nizoral', 'Ketoconazole', 'Upset stomach / vomiting / liver damage'),
('Infections', 'Nydrazid', 'Isoniazid', 'Liver damage / headache / flushing/redness of the face'),
('Infections', 'Seromycin', 'Cycloserine', 'Liver damage / headache / flushing/redness of the face'),
('Infections', 'Tindamax', 'Tinidazole', 'Liver damage / headache / flushing/redness of the face'),
('Infections', 'Zithromax', 'Azithromycin', 'none'),
('Mood Stabilizers', 'Depakene / Depakote', 'Valproic Acid', 'Drowsiness / dizziness / tremors; increased risk for side effects (restlessness / impaired motor control / loss of appetite / stomach upset / muscle/joint pain / depression / liver damage)'),
('Mood Stabilizers', 'Eskalith / Eskalith CR / Lithobid', 'Lithium', 'Drowsiness / dizziness; increased risk of seizures / overdose / slowed/difficulty breathing / impaired motor control / unusual behavior / memory problems'),
('Muscle Pain', 'Flexeril', 'Cyclobenzaprine', 'Drowsiness / dizziness; increased risk of seizures / overdose / slowed/difficulty breathing / impaired motor control / unusual behavior / memory problems'),
('Muscle Pain', 'Soma', 'Carisoprodol', 'Drowsiness / dizziness; increased risk of seizures / overdose / slowed/difficulty breathing / impaired motor control / unusual behavior / memory problems'),
('Motion Sickness', 'Antivert', 'Meclizine', 'Drowsiness / dizziness; increased risk for overdose'),
('Motion Sickness', 'Dramamine', 'Dimenhydrinate', 'Drowsiness / dizziness; increased risk for overdose'),
('Motion Sickness', 'Phenergan', 'Promethazine', 'Drowsiness / dizziness; increased risk for overdose'),
('Pain / Fever / Inflammation', 'Advil / Motrin', 'Ibuprofen', 'Stomach upset / bleeding / ulcers'),
('Pain / Fever / Inflammation', 'Aleve', 'Naproxen', 'Stomach upset / bleeding / ulcers'),
('Pain / Fever / Inflammation', 'Excedrin', 'Aspirin + Acetaminophen', 'Liver damage (acetaminophen) / rapid heartbeat'),
('Pain / Fever / Inflammation', 'Tylenol', 'Acetaminophen', 'Liver damage / rapid heartbeat'),
('Seizures', 'Dilantin', 'Phenytoin', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health (e.g. suicidal thoughts)'),
('Seizures', 'Horizant / Neurontin', 'Gabapentin', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health (e.g. suicidal thoughts)'),
('Seizures', 'Keppra', 'Levetiracetam', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health (e.g. suicidal thoughts)'),
('Seizures', 'Klonopin', 'Clonazepam', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health (e.g. suicidal thoughts)'),
('Seizures', 'Lamictal', 'Lamotrigine', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health (e.g. suicidal thoughts)'),
('Seizures', 'Lyrica', 'Pregabalin', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health (e.g. suicidal thoughts)'),
('Seizures', 'Tegretol', 'Carbamazepine', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health (e.g. suicidal thoughts)'),
('Seizures', 'Topamax', 'Topiramate', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health; increased mental health risks (e.g. suicidal thoughts)'),
('Seizures', 'Trileptal', 'Oxcarbazepine', 'Drowsiness / dizziness / increased risk of seizures / unusual behavior / changes in mental health; increased mental health risks (e.g. suicidal thoughts)'),
('Severe Pain', 'Darvocet-N', 'Propoxyphene', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Severe Pain', 'Demerol', 'Meperidine', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Severe Pain', 'Fiorinal with codeine', 'Butalbital + Codeine', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Severe Pain', 'Percocet', 'Oxycodone', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Severe Pain', 'Vicodin', 'Hydrocodone', 'Drowsiness / dizziness; increased risk for overdose; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Sleep Problems', 'Ambien', 'Zolpidem', 'Drowsiness / sleepiness / dizziness; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Sleep Problems', 'Lunesta™', 'Eszopiclone', 'Drowsiness / sleepiness / dizziness; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Sleep Problems', 'Prosom™', 'Estazolam', 'Drowsiness / sleepiness / dizziness; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Sleep Problems', 'Restoril', 'Temazepam', 'Drowsiness / sleepiness / dizziness; slowed or difficulty breathing; impaired motor control; unusual behavior; memory problems'),
('Sleep Problems', 'Sominex', 'Diphenhydramine', 'Increased drowsiness'),
('Sleep Problems', 'Unisom', 'Doxylamine', 'Increased drowsiness'),
('Sleep Problems', 'Herbal preparations', 'Chamomile / Valerian / Lavender', 'Increased drowsiness')

]

# Loop over every entry in the sample data and execute the insert command
for entry in sample_data:
    if create_table_sql:
        cursor.execute(insert_data_sql, entry)

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Sample data inserted successfully.")