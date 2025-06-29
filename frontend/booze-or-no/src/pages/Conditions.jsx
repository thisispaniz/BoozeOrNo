import Footer from "../components/Footer";

const Conditions = () =>  {
    return (
        <div className="page-container">
            <h1>Conditions x alcohol checker</h1>
            <p>We are currently working on a detailed database for conditions that alcohol has significant effects on and the level of danger. Until the database is ready, here is a list:</p>
            <ol>
                <h2 className="list-h2">Liver-related conditions:</h2>
                <li>Hepatitis (especially Hepatitis B and C)</li>
                <li>Cirrhosis</li>
                <li>Fatty Liver Disease (NAFLD/NASH)</li>
                <li>Alcoholic Hepatitis</li>
                <h2 className="list-h2">Pancreas and Digestive Disorders:</h2>
                <li>Pancreatitis (acute or chronic)</li>
                <li>Gastroesophageal Reflux Disease (GERD)</li>
                <li>Peptic Ulcer Disease</li>
                <li>Inflammatory Bowel Disease (Crohn's, Ulcerative Colitis)</li>
                <h2 className="list-h2">Neurological and Mental Health Disorders:</h2>
                <li>Depression</li>
                <li>Bipolar DIsorder</li>
                <li>Schizophrenia</li>
                <li>Epilepsy or Seizure Disorders</li>
                <li>Sleep Disorders (e.g., insomnia, sleep apnea)</li>
                <h2 className="list-h2">Cardiovascular Conditions:</h2>
                <li>High Blood Pressure (Hypertension)</li>
                <li>Heart Failure</li>
                <li>Cardiomyopathy</li>
                <li>Arrhythmias (e.g., atrial fibrillation)</li>
                <h2 className="list-h2">Metabolic and Endocrine Disorders:</h2>
                <li>Diabetes (Type 1 and Type 2)</li>
                <li>Obesity</li>
                <li>Hypertriglyceridemia</li>
                <h2 className="list-h2">Cancer and Immune Disorders</h2>
                <li>Any current or past Cancer (especially breast, liver, esophageal, or colorectal)</li>
                <li>Weakened Immune System (e.g., HIV/AIDS)</li>
            </ol>
            <Footer />
        </div>
    );
};

export default Conditions;
