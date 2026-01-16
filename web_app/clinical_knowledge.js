
// Clinical Knowledge Base - WHO IMCI Aligned
// Covers common childhood illnesses in low-resource settings

export const CLINICAL_KNOWLEDGE_BASE = {
    // -------------------------------------------------------------------------
    // 1. GENERAL DANGER SIGNS (IMMEDIATE PRIORITY)
    // -------------------------------------------------------------------------
    "danger_signs": {
        "convulsions": {
            "diagnosis": "Severe Neurological Compromise",
            "tier": "RED",
            "reasoning": "History of convulsions indicates severe disease (meningitis, cerebral malaria, or febrile seizure).",
            "treatment": [
                "Give Diazepam rectally if convulsing now.",
                "Give first dose of intramuscular Artemether if malaria suspected.",
                "Treat low blood sugar.",
                "Refer URGENTLY to hospital."
            ]
        },
        "vomits_everything": {
            "diagnosis": "Severe Gastrointestinal Compromise",
            "tier": "RED",
            "reasoning": "Inability to hold down fluids/medication puts child at high risk of dehydration and hypoglycemia.",
            "treatment": [
                "Give Vitamin A.",
                "Treat low blood sugar.",
                "Refer URGENTLY to hospital for IV fluids."
            ]
        },
        "lethargic": {
            "diagnosis": "Altered Consciousness",
            "tier": "RED",
            "reasoning": "Lethargy or unconsciousness suggests severe systemic infection (sepsis, meningitis, cerebral malaria).",
            "treatment": [
                "Assess for low blood sugar.",
                "Give first dose of IV/IM antibiotics.",
                "Refer URGENTLY."
            ]
        }
    },

    // -------------------------------------------------------------------------
    // 2. COUGH OR DIFFICULTY BREATHING
    // -------------------------------------------------------------------------
    "respiratory": {
        "stridor": {
            "diagnosis": "Severe Pseudo-Croup / Severe Respiratory Obstruction",
            "tier": "RED",
            "reasoning": "Stridor in a calm child indicates upper airway obstruction.",
            "treatment": [
                "Administer nebulized epinephrine/adrenaline if available.",
                "Refer URGENTLY."
            ]
        },
        "chest_indrawing": {
            "diagnosis": "Severe Pneumonia",
            "tier": "RED",
            "reasoning": "Chest indrawing is a sign of severe lung stiffness/compliance issues.",
            "treatment": [
                "Give first dose of appropriated antibiotic (e.g. Amoxicillin or Gentamicin).",
                "Refer URGENTLY."
            ]
        },
        "fast_breathing": {
            "diagnosis": "Pneumonia",
            "tier": "YELLOW",
            "reasoning": "Fast breathing is the primary indicator for non-severe pneumonia.",
            "treatment": [
                "Give oral Amoxicillin for 5 days.",
                "Soothe throat with warm water/honey (if > 1yr).",
                "Advise mother when to return immediately.",
                "Follow up in 2 days."
            ]
        }
    },

    // -------------------------------------------------------------------------
    // 3. DIARRHEA
    // -------------------------------------------------------------------------
    "diarrhea": {
        "severe_dehydration": {
            "symptoms": ["sunken eyes", "skin pinch slow", "lethargic"],
            "diagnosis": "Severe Dehydration",
            "tier": "RED",
            "reasoning": "Two or more signs of severe dehydration found.",
            "treatment": [
                "Start IV fluids (Ringer's Lactate) immediately.",
                "If no IV, give ORS by nasogastric tube.",
                "Refer URGENTLY."
            ]
        },
        "some_dehydration": {
            "symptoms": ["restless", "irritable", "sunken eyes", "drink eagerly"],
            "diagnosis": "Some Dehydration",
            "tier": "YELLOW",
            "reasoning": "Two or more signs of some dehydration found.",
            "treatment": [
                "Give fluid, zinc supplements.",
                "Advise mother to continue breastfeeding.",
                "Follow up in 2 days."
            ]
        },
        "blood_in_stool": {
            "diagnosis": "Dysentery",
            "tier": "YELLOW",
            "reasoning": "Visible blood in stool suggests shigellosis or amoebiasis.",
            "treatment": [
                "Treat for 3 days with Ciprofloxacin.",
                "Follow up in 2 days."
            ]
        }
    },

    // -------------------------------------------------------------------------
    // 4. FEVER (MALARIA ZONE)
    // -------------------------------------------------------------------------
    "fever": {
        "stiff_neck": {
            "diagnosis": "Very Severe Febrile Disease (Meningitis Risk)",
            "tier": "RED",
            "reasoning": "Fever with stiff neck strongly suggests meningitis.",
            "treatment": [
                "Give first dose of Ceftriaxone.",
                "Treat for low blood sugar.",
                "Refer URGENTLY."
            ]
        },
        "malaria_simple": {
            "diagnosis": "Malaria (Uncomplicated)",
            "tier": "YELLOW",
            "reasoning": "Fever in a high-risk malaria zone without danger signs.",
            "treatment": [
                "Perform RDT (Rapid Diagnostic Test).",
                "If positive: Give oral ACT for 3 days.",
                "Give Paracetamol for fever > 38.5C.",
                "Advise mother when to return."
            ]
        },
        "measles_complication": {
            "symptoms": ["clouding of cornea", "deep mouth ulcers"],
            "diagnosis": "Severe Complicated Measles",
            "tier": "RED",
            "reasoning": "Measles rash with eye/mouth complications.",
            "treatment": [
                "Apply simple eye ointment.",
                "Give Vitamin A.",
                "Refer URGENTLY."
            ]
        }
    },

    // -------------------------------------------------------------------------
    // 5. EAR INFECTION
    // -------------------------------------------------------------------------
    "ear": {
        "mastoiditis": {
            "symptoms": ["tender swelling behind ear"],
            "diagnosis": "Mastoiditis",
            "tier": "RED",
            "reasoning": "Infection has spread to mastoid bone.",
            "treatment": [
                "Give first dose of antibiotics.",
                "Refer URGENTLY."
            ]
        },
        "ear_infection": {
            "symptoms": ["ear discharge"],
            "diagnosis": "Acute Ear Infection",
            "tier": "YELLOW",
            "reasoning": "Pus is draining from the ear.",
            "treatment": [
                "Give oral antibiotics for 5 days.",
                "Dry the ear by wicking.",
                "Follow up in 5 days."
            ]
        }
    },
    "abdominal_aortic_aneurysm": {
        "diagnosis": "Abdominal aortic aneurysm",
        "tier": "GREEN",
        "symptoms": ["smoking", "eating a high-fat diet", "not exercising regularly", "being overweight or obese"],
        "reasoning": "Based on NHS Inform guidelines for Abdominal aortic aneurysm.",
        "treatment": []
    },
    "achilles_tendinopathy": {
        "diagnosis": "Achilles tendinopathy",
        "tier": "GREEN",
        "symptoms": ["swelling", "pain that\u2019s worse during or after moving or exercising", "stiffness that\u2019s worse in the morning or after a period of rest", "tenderness to touch the affected area", "mild heat", "loss of movement and strength around the ankle and foot"],
        "reasoning": "Based on NHS Inform guidelines for Achilles tendinopathy.",
        "treatment": []
    },
    "acne": {
        "diagnosis": "Acne",
        "tier": "GREEN",
        "symptoms": ["flares up around your period, or", "is associated with hormonal conditions like polycystic ovary syndrome"],
        "reasoning": "Based on NHS Inform guidelines for Acne.",
        "treatment": ["flares up around your period, or", "is associated with hormonal conditions like polycystic ovary syndrome"]
    },
    "acute_cholecystitis": {
        "diagnosis": "Acute cholecystitis",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Acute cholecystitis.",
        "treatment": ["fasting (not eating or drinking) to take the strain off your gallbladder", "receiving fluids through a drip directly into a vein (intravenously) to prevent dehydration", "taking medication to relieve your pain"]
    },
    "acute_lymphoblastic_leukaemia": {
        "diagnosis": "Acute lymphoblastic leukaemia",
        "tier": "GREEN",
        "symptoms": ["lymphoid stem cells \u2013 these make a type of white blood cell called lymphocytes. all affects lymphoid stem cells.", "myeloid stem cells \u2013 these make red blood cells, platelets and other types of white blood cell."],
        "reasoning": "Based on NHS Inform guidelines for Acute lymphoblastic leukaemia.",
        "treatment": ["the type of ALL", "any gene changes (mutations) in the leukaemia cells", "if the leukaemia cells produce certain proteins."]
    },
    "acute_myeloid_leukaemia": {
        "diagnosis": "Acute myeloid leukaemia",
        "tier": "GREEN",
        "symptoms": ["myeloid stem cells \u2013 which make red blood cells, platelets and other types of white blood cell. aml affects myeloid stem cells.", "lymphoid stem cells \u2013 which make a type of white blood cell called lymphocytes."],
        "reasoning": "Based on NHS Inform guidelines for Acute myeloid leukaemia.",
        "treatment": ["Intensive treatment \u2013 to get rid of the leukaemia cells in your blood and bone marrow. When this happens, it is called remission.", "Non-intensive treatment \u2013 to get rid of any remaining leukaemia cells and reduce the risk of the leukaemia coming back."]
    },
    "acute_pancreatitis": {
        "diagnosis": "Acute pancreatitis",
        "tier": "GREEN",
        "symptoms": ["nausea (feeling sick) or vomiting", "diarrhoea", "indigestion", "a high temperature (fever) of 38c (100.4f) or above", "jaundice \u2013 yellowing of the skin and the whites of the eyes", "tenderness or swelling of the abdomen (tummy)"],
        "reasoning": "Based on NHS Inform guidelines for Acute pancreatitis.",
        "treatment": []
    },
    "acute_respiratory_infection_ari": {
        "diagnosis": "Acute respiratory infection (ARI)",
        "tier": "YELLOW",
        "symptoms": ["a new continuous cough", "sneezing", "a blocked or runny nose", "a sore throat", "a headache", "muscle aches", "shortness of breath, tight chest or wheezing", "a high temperature (fever) \u2013 this is usually about 38\u00b0c or higher (100.4\u00b0f)", "feeling generally unwell", "feeling tired or have a lack of energy"],
        "reasoning": "Based on NHS Inform guidelines for Acute respiratory infection (ARI).",
        "treatment": ["rest", "drink plenty of fluids", "eat healthily", "take over-the-counter pain relief, such as paracetamol or ibuprofen, to relieve high temperature and aches", "use decongestant sprays or tablets to relieve a blocked nose", "use extra pillows to raise your head while sleeping to make breathing easier and clear your chest of mucus", "try remedies such as gargling salt water and sucking on menthol sweets"]
    },
    "addison_s_disease": {
        "diagnosis": "Addison’s disease",
        "tier": "GREEN",
        "symptoms": ["fatigue (lack of energy or motivation)", "lethargy (abnormal drowsiness or tiredness)", "muscle weakness", "low mood (mild depression) or irritability", "loss of appetite and unintentional weight loss", "the need to urinate frequently", "increased thirst", "craving for salty foods"],
        "reasoning": "Based on NHS Inform guidelines for Addison’s disease.",
        "treatment": ["severe dehydration", "pale, cold, clammy skin", "sweating", "rapid, shallow breathing", "dizziness", "severe vomiting and diarrhoea", "severe muscle weakness", "headache"]
    },
    "adenomyosis": {
        "diagnosis": "Adenomyosis",
        "tier": "GREEN",
        "symptoms": ["heavy periods that last for a long time", "severe period pain", "a feeling of pressure in your tummy", "bloating (your tummy sticks out more than normal)"],
        "reasoning": "Based on NHS Inform guidelines for Adenomyosis.",
        "treatment": ["anti-inflammatory medication to help relieve mild pain", "treatment during your period to help reduce the amount of menstrual blood loss", "hormone therapy such as the contraceptive pill, to help control heavy or painful periods", "a hysterectomy (removal of the womb) \u2013 this would only be considered in extreme cases, where other treatments do not work and if you do not wish to become pregnant"]
    },
    "alcohol_related_liver_disease": {
        "diagnosis": "Alcohol-related liver disease",
        "tier": "GREEN",
        "symptoms": ["abdominal pain", "loss of appetite", "fatigue", "feeling sick", "diarrhoea", "feeling generally unwell"],
        "reasoning": "Based on NHS Inform guidelines for Alcohol-related liver disease.",
        "treatment": ["anabolic steroids (a more powerful type of steroid medication)", "ropylthiouracil (a type of medicine originally designed to treat overactive thyroid glands)"]
    },
    "allergic_rhinitis": {
        "diagnosis": "Allergic rhinitis",
        "tier": "GREEN",
        "symptoms": ["sneezing", "itchiness", "a blocked or runny nose"],
        "reasoning": "Based on NHS Inform guidelines for Allergic rhinitis.",
        "treatment": ["take over-the-counter medications, such as antihistamines", "clean your nasal passages with a salt water solution", "avoid triggers if you can"]
    },
    "allergies": {
        "diagnosis": "Allergies",
        "tier": "GREEN",
        "symptoms": ["sneezing", "a runny or blocked\u00a0nose", "red, itchy, watery eyes", "wheezing and coughing", "a red, itchy rash", "worsening of\u00a0asthma or\u00a0eczema symptoms"],
        "reasoning": "Based on NHS Inform guidelines for Allergies.",
        "treatment": ["antihistamines\u00a0\u2013 these can be taken when you notice the symptoms of a reaction, or before being exposed to an allergen to stop a reaction occurring", "decongestants\u00a0\u2013 tablets, capsules, nasal sprays or liquids that can be used as a short-term treatment for a blocked nose", "lotions and creams, such as\u00a0moisturising creams (emollients)\u00a0\u2013 these can\u00a0reduce skin redness and itchiness", "steroid medication\u00a0\u2013 sprays, drops, creams, inhalers and tablets that can help reduce redness and swelling caused by an allergic reaction"]
    },
    "alzheimer_s_disease": {
        "diagnosis": "Alzheimer’s disease",
        "tier": "GREEN",
        "symptoms": ["confusion, disorientation and getting lost in familiar places", "difficulty planning or making decisions", "problems with speech and language", "problems moving around without help", "difficulty performing self-care tasks", "stress and distress", "hallucinations (seeing or hearing things that aren\u2019t there)", "delusions (believing things that are untrue)", "low mood or anxiety"],
        "reasoning": "Based on NHS Inform guidelines for Alzheimer’s disease.",
        "treatment": ["what support you or your carer need for you to remain as independent as possible", "whether there are any changes that need to be made to your home to make it easier to live in", "whether you need any financial assistance"]
    },
    "anal_cancer": {
        "diagnosis": "Anal cancer",
        "tier": "GREEN",
        "symptoms": ["colon cancer", "rectal cancer", "small bowel cancer"],
        "reasoning": "Based on NHS Inform guidelines for Anal cancer.",
        "treatment": ["examine you", "ask how you are feeling and whether you have any ongoing treatment side effects", "ask whether you have any new symptoms."]
    },
    "anaphylaxis": {
        "diagnosis": "Anaphylaxis",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Anaphylaxis.",
        "treatment": []
    },
    "angina": {
        "diagnosis": "Angina",
        "tier": "GREEN",
        "symptoms": ["feel like a dull pain, ache, \u2018heavy\u2019 or \u2018tight\u2019 feeling in your chest", "spread to your arms, neck, jaw or back", "be triggered by physical exertion"],
        "reasoning": "Based on NHS Inform guidelines for Angina.",
        "treatment": []
    },
    "angioedema": {
        "diagnosis": "Angioedema",
        "tier": "YELLOW",
        "symptoms": ["a hot or painful\u00a0sensation in the swollen areas", "swelling of the inside of the throat, the\u00a0windpipe and the tongue, making breathing difficult", "swelling of the conjunctiva (the transparent layer of cells that cover the white part of the eye), which affects\u00a0vision"],
        "reasoning": "Based on NHS Inform guidelines for Angioedema.",
        "treatment": []
    },
    "ankle_sprain": {
        "diagnosis": "Ankle sprain",
        "tier": "GREEN",
        "symptoms": ["swelling\u00a0and bruising", "pain", "mild heat and redness.", "loss of movement and strength around the ankle and foot", "difficulty walking or going up or down stairs", "tingling, numbness or pins and needles in the affected area"],
        "reasoning": "Based on NHS Inform guidelines for Ankle sprain.",
        "treatment": []
    },
    "ankle_avulsion_fracture": {
        "diagnosis": "Ankle avulsion fracture",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Ankle avulsion fracture.",
        "treatment": []
    },
    "ankylosing_spondylitis": {
        "diagnosis": "Ankylosing spondylitis",
        "tier": "GREEN",
        "symptoms": ["arthritis \u2013 causing pain, tenderness and swelling in the joints", "enthesitis \u2013 painful inflammation where a bone is joined to a tendon or ligament, commonly in the heel, ribs or elbow", "pain and swelling in other parts of the body \u2013 like the hips, knees and ribs", "fatigue \u2013 severe tiredness that doesn\u2019t improve with sleep or rest", "pain in your lower back in the early morning", "morning stiffness that lasts at least 30 minutes and then eases through the day or with activity", "pain that doesn\u2019t improve or gets worse with rest", "waking up regularly during the night because of the pain", "pain in the area around your buttocks"],
        "reasoning": "Based on NHS Inform guidelines for Ankylosing spondylitis.",
        "treatment": ["exercise", "physiotherapy", "medication"]
    },
    "anorexia_nervosa": {
        "diagnosis": "Anorexia nervosa",
        "tier": "GREEN",
        "symptoms": ["if you\u2019re under 18, your weight and height may be lower than the healthy range expected for your age", "if you\u2019re an adult, you may have an unusually low body mass index (bmi) or rapidly lose weight over a short time", "severely restricting food, drink and calories so that your body doesn\u2019t get the nutrition it needs", "thinking about food a lot", "being very careful about what you eat, such as avoiding eating any foods you see as fattening or unhealthy", "making yourself sick after food or using drugs like laxatives or weight loss medication", "believing you\u2019re overweight when you\u2019re a healthy weight or underweight", "avoiding looking in mirrors or wearing baggy clothes", "constantly checking your weight and comparing yourself to others", "if you get periods and you have anorexia nervosa, your periods may stop"],
        "reasoning": "Based on NHS Inform guidelines for Anorexia nervosa.",
        "treatment": ["have a very low weight", "lose weight quickly", "are making themselves sick several times a day", "are regularly using laxatives"]
    },
    "anxiety_disorders_in_children_and_young_people": {
        "diagnosis": "Anxiety disorders in children and young people",
        "tier": "GREEN",
        "symptoms": ["finding it hard to concentrate", "not sleeping, or waking in the night", "not eating properly", "quickly getting more angry or irritable than they usually do", "always worrying or having negative thoughts", "feeling tense and fidgety, or using the toilet more often than usual", "always crying", "being clingy all the time", "complaining of tummy aches and feeling unwell", "being withdrawn and not wanting to do things they used to enjoy"],
        "reasoning": "Based on NHS Inform guidelines for Anxiety disorders in children and young people.",
        "treatment": ["moving house and school often", "parents who constantly fight or do not get on", "the death of a close relative or friend", "becoming ill or injured in an accident", "a family member who is unwell or needs extra support", "school-related issues like homework or exams, or bullying or friendship problems", "becoming involved in crime", "being abused or neglected"]
    },
    "aplastic_anaemia": {
        "diagnosis": "Aplastic anaemia",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Aplastic anaemia.",
        "treatment": []
    },
    "appendicitis": {
        "diagnosis": "Appendicitis",
        "tier": "GREEN",
        "symptoms": ["feeling sick (nausea)", "being sick", "loss of appetite", "diarrhoea", "a high temperature (fever) and a flushed face"],
        "reasoning": "Based on NHS Inform guidelines for Appendicitis.",
        "treatment": []
    },
    "arterial_thrombosis": {
        "diagnosis": "Arterial thrombosis",
        "tier": "GREEN",
        "symptoms": ["angina", "heart attack", "stroke", "peripheral vascular disease"],
        "reasoning": "Based on NHS Inform guidelines for Arterial thrombosis.",
        "treatment": []
    },
    "arthritis": {
        "diagnosis": "Arthritis",
        "tier": "GREEN",
        "symptoms": ["joint pain", "tenderness in the joints", "stiffness in the joints", "inflammation in and around the joints", "restricted movement in the joints", "warm, red skin on your joints", "weakness and muscle wasting"],
        "reasoning": "Based on NHS Inform guidelines for Arthritis.",
        "treatment": ["painkillers", "non-steroidal anti-inflammatory drugs (NSAIDs)", "corticosteroids", "disease modifying anti-rheumatic drugs (DMARDs)", "physiotherapy", "regular exercise"]
    },
    "asbestosis": {
        "diagnosis": "Asbestosis",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Asbestosis.",
        "treatment": ["industrial injuries disablement benefit \u2013 a weekly benefit that may be paid to people with asbestosis who were exposed to asbestos while in employment (but not self-employed)", "a civil claim for compensation through the courts \u2013 you\u2019ll need to obtain legal advice about how to do this", "a claim for a lump compensation sum under the Pneumoconiosis etc. (Workers\u2019 Compensation) Act 1979 \u2013 if you have asbestosis, or you\u2019re the dependent of someone who has died from the condition, and you haven\u2019t been able to get compensation through the courts because the employer has ceased trading"]
    },
    "asthma": {
        "diagnosis": "Asthma",
        "tier": "GREEN",
        "symptoms": ["coughing", "wheezing", "chest tightness", "breathlessness"],
        "reasoning": "Based on NHS Inform guidelines for Asthma.",
        "treatment": ["prevent future symptoms and attacks", "relieve your symptoms"]
    },
    "ataxia": {
        "diagnosis": "Ataxia",
        "tier": "GREEN",
        "symptoms": ["becoming more clumsy", "slurred speech", "problems with swallowing which can cause choking or coughing", "tremors or shaking", "fatigue or tiredness", "problems with sight like blurred or jumpy vision caused by difficulty controlling eye movements"],
        "reasoning": "Based on NHS Inform guidelines for Ataxia.",
        "treatment": ["ataxia with vitamin E deficiency as this can often be improved with vitamin E supplements", "episodic ataxia as it can often be improved by taking a medication called acetazolamide and by avoiding triggers like caffeine, stress and alcohol", "acquired ataxia as it can sometimes be treated if the specific cause is something like an infection where antibiotics or antiviral treatment might help"]
    },
    "atopic_eczema": {
        "diagnosis": "Atopic eczema",
        "tier": "GREEN",
        "symptoms": ["itchy", "dry, cracked, crusty, scaly or thickened", "red, white, purple or grey", "lighter or darker than the skin around it (depending on your skin tone)", "blister or bleed", "painful"],
        "reasoning": "Based on NHS Inform guidelines for Atopic eczema.",
        "treatment": ["moisturising creams, lotions, ointments and gels that you apply to your skin", "steroid creams, lotions or gels that you apply to your skin (topical corticosteroids)"]
    },
    "atrial_fibrillation": {
        "diagnosis": "Atrial fibrillation",
        "tier": "GREEN",
        "symptoms": ["tiredness", "breathlessness", "dizziness", "feeling faint", "chest discomfort or pain"],
        "reasoning": "Based on NHS Inform guidelines for Atrial fibrillation.",
        "treatment": ["medication, like beta blockers and anti-arrhythmic drugs", "ablation", "having a pacemaker fitted", "cardioversion"]
    },
    "attention_deficit_hyperactivity_disorder_adhd": {
        "diagnosis": "Attention deficit hyperactivity disorder (ADHD)",
        "tier": "GREEN",
        "symptoms": ["having a short attention span", "being easily distracted", "making careless mistakes", "appearing forgetful", "losing things", "being unable to stick at tedious or time-consuming tasks", "appearing to be unable to listen to or carry out instructions", "constantly changing activity or task", "having difficulty organising tasks"],
        "reasoning": "Based on NHS Inform guidelines for Attention deficit hyperactivity disorder (ADHD).",
        "treatment": []
    },
    "autism": {
        "diagnosis": "Autism",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Autism.",
        "treatment": []
    },
    "back_problems": {
        "diagnosis": "Back problems",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Back problems.",
        "treatment": ["staying in one position too long", "lifting something awkwardly", "a flare-up of an existing problem", "doing more activity than you normally would"]
    },
    "bacterial_vaginosis": {
        "diagnosis": "Bacterial vaginosis",
        "tier": "GREEN",
        "symptoms": ["are pregnant", "think you might be pregnant", "are breastfeeding"],
        "reasoning": "Based on NHS Inform guidelines for Bacterial vaginosis.",
        "treatment": ["are pregnant", "think you might be pregnant", "are breastfeeding"]
    },
    "becker_muscular_dystrophy": {
        "diagnosis": "Becker muscular dystrophy",
        "tier": "GREEN",
        "symptoms": ["learn to walk later than usual", "experience muscle cramps during exercise", "struggle with sports at school", "have difficulty running, climbing stairs and getting up from the floor", "have difficulty lifting heavy objects above their head", "have difficulty lifting their arms above shoulder level", "have learning and/or behavioural difficulties or autism"],
        "reasoning": "Based on NHS Inform guidelines for Becker muscular dystrophy.",
        "treatment": ["low-impact exercise like swimming", "physiotherapy to work on muscle strength and flexibility", "physical aids like a walking stick, crutches or a wheelchair", "occupational therapy to help maintain independence"]
    },
    "benign_prostate_enlargement": {
        "diagnosis": "Benign prostate enlargement",
        "tier": "GREEN",
        "symptoms": ["make it difficult for you to start urinating", "weaken the\u00a0flow of urine or cause \u2018stopping and starting\u2019", "cause you to strain to pass urine", "cause you to need to urinate\u00a0frequently", "cause you to wake up frequently during the night to urinate", "cause a sudden urge to urinate, which can result in\u00a0urinary incontinence if you can\u2019t find a toilet quickly enough", "cause you to not be able to empty your bladder fully", "cause blood in the urine (haematuria)"],
        "reasoning": "Based on NHS Inform guidelines for Benign prostate enlargement.",
        "treatment": []
    },
    "bile_duct_cancer_cholangiocarcinoma": {
        "diagnosis": "Bile duct cancer (cholangiocarcinoma)",
        "tier": "GREEN",
        "symptoms": ["perihilar bile duct cancers make up 5 in 10 bile duct cancers (50%). they start in the area where the bile ducts leave the liver.", "distal bile duct cancers make up 3 to 4 in 10 bile duct cancers (30 to 40%). they start lower down, nearer the small bowel."],
        "reasoning": "Based on NHS Inform guidelines for Bile duct cancer (cholangiocarcinoma).",
        "treatment": ["has spread to other parts of the body", "is not suitable for surgery (unresectable)"]
    },
    "binge_eating_disorder_bed": {
        "diagnosis": "Binge eating disorder (BED)",
        "tier": "GREEN",
        "symptoms": ["eating a large quantity of food over a short time (bingeing)", "feeling out of control of your eating and feeling distressed", "restricting your eating or putting strict rules around eating", "fasting for long periods of time before or after a binge", "hoarding food", "feeling ashamed and hiding evidence of eating from others \u2013 close family and friends may be unaware of the distress and binges", "planning the day around food by trying to restrict how much food you eat and then fasting which may lead to more binges", "having low self-esteem and feeling shame", "being preoccupied about weight and body shape"],
        "reasoning": "Based on NHS Inform guidelines for Binge eating disorder (BED).",
        "treatment": ["high cholesterol", "high blood pressure", "diabetes", "osteoarthritis", "some types of cancer"]
    },
    "bipolar_disorder": {
        "diagnosis": "Bipolar disorder",
        "tier": "GREEN",
        "symptoms": ["down, upset or tearful", "guilt and despair", "agitated", "tense", "tired or sluggish", "uninterested in everyday things", "empty", "suicidal"],
        "reasoning": "Based on NHS Inform guidelines for Bipolar disorder.",
        "treatment": ["medication", "talking therapy", "making lifestyle changes \u2013 like\u00a0exercising regularly\u00a0and\u00a0improving your diet"]
    },
    "bladder_cancer": {
        "diagnosis": "Bladder cancer",
        "tier": "GREEN",
        "symptoms": ["squamous cell carcinoma", "adenocarcinoma", "small cell bladder cancer."],
        "reasoning": "Based on NHS Inform guidelines for Bladder cancer.",
        "treatment": ["shrink or control the cancer and help you live longer", "reduce your symptoms and improve quality of life."]
    },
    "sepsis": {
        "diagnosis": "Sepsis",
        "tier": "RED",
        "symptoms": ["over 38c (babies under 3 months)", "over 39c (babies aged 3 to 6 months)", "below 36c \u2013 check 3 times in a 10-minute period", "a high temperature in a child who can\u2019t be encouraged to show interest in anything"],
        "reasoning": "Based on NHS Inform guidelines for Sepsis.",
        "treatment": ["the sepsis is severe", "you develop septic shock\u00a0\u2013 when your blood pressure drops to a dangerously low level"]
    },
    "bone_cancer": {
        "diagnosis": "Bone cancer",
        "tier": "GREEN",
        "symptoms": ["osteosarcoma", "chondrosarcoma", "ewing sarcoma", "chordoma."],
        "reasoning": "Based on NHS Inform guidelines for Bone cancer.",
        "treatment": ["call the Macmillan Support Line for free on 0808 808 00 00", "chat to Macmillan specialists online", "visit the Macmillan bone cancer forum to talk with people who have been affected by bone cancer, share your experience, and ask an expert your questions."]
    },
    "bottom_shuffling_in_young_children": {
        "diagnosis": "Bottom shuffling in young children",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Bottom shuffling in young children.",
        "treatment": []
    },
    "bowel_cancer": {
        "diagnosis": "Bowel cancer",
        "tier": "GREEN",
        "symptoms": ["colon cancer", "rectal cancer."],
        "reasoning": "Based on NHS Inform guidelines for Bowel cancer.",
        "treatment": ["call the Macmillan Support Line for free on 0808 808 00 00", "chat to our specialists online", "visit our bowel (colon and rectal) cancer forum to talk to people who have been affected by bowel cancer, share your experience, and ask an expert your questions."]
    },
    "bowel_incontinence": {
        "diagnosis": "Bowel incontinence",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Bowel incontinence.",
        "treatment": ["bowel incontinence isn\u2019t something to be ashamed of \u2013 it\u2019s simply a medical problem that\u2019s no different from\u00a0diabetes or asthma", "it can be treated \u2013 there\u2019s a wide range of successful treatments", "bowel incontinence isn\u2019t a normal part of ageing", "it won\u2019t usually go away on its own \u2013 most people need treatment for the condition"]
    },
    "bowel_polyps": {
        "diagnosis": "Bowel polyps",
        "tier": "GREEN",
        "symptoms": ["a small amount of rectal bleeding\u00a0(blood in your stool)", "mucus to be produced when you open your bowels", "diarrhoea\u00a0or constipation", "abdominal pain"],
        "reasoning": "Based on NHS Inform guidelines for Bowel polyps.",
        "treatment": []
    },
    "bow_legs_and_knock_knees_in_children_and_young_people": {
        "diagnosis": "Bow legs and knock knees in children and young people",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Bow legs and knock knees in children and young people.",
        "treatment": ["asymmetry between two legs (legs look different from each other)", "consistent pain in their legs limiting their activity", "things haven\u2019t improve over 12 months", "bow legs beyond the age of 3, especially after 8", "knock knees before the age of 2", "knock knees after the age of 8"]
    },
    "brain_stem_death": {
        "diagnosis": "Brain stem death",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Brain stem death.",
        "treatment": []
    },
    "brain_tumours": {
        "diagnosis": "Brain tumours",
        "tier": "GREEN",
        "symptoms": ["blood vessels (mr angiography)", "chemical activity (mr spectroscopy)", "blood volume (mr perfusion)", "fibre tracts (mr diffusion or tractography)", "specific functional areas (fmri or functional mri in the brain)"],
        "reasoning": "Based on NHS Inform guidelines for Brain tumours.",
        "treatment": ["Call the Macmillan Support Line for free on 0808 808 00 00.", "Chat to Macmillan specialists online.", "Visit the Macmillan brain cancer forum to talk with people who have been affected by brain tumours, share your experience, and ask an expert your questions."]
    },
    "breast_cancer_female": {
        "diagnosis": "Breast cancer (female)",
        "tier": "GREEN",
        "symptoms": ["you have had any other breast problems or health problems", "anyone in your family has had breast cancer or ovarian cancer", "you have been through the menopause", "you are taking any medicines \u2013 for example, hormone replacement therapy (hrt) or the contraceptive pill."],
        "reasoning": "Based on NHS Inform guidelines for Breast cancer (female).",
        "treatment": ["Call the Macmillan Support Line for free on 0808 808 00 00.", "Chat to Macmillan Support specialists online.", "Visit the Macmillan breast cancer forum to talk with people who have been affected by breast cancer, share your experience, and ask an expert your questions."]
    },
    "breast_cancer_male": {
        "diagnosis": "Breast cancer (male)",
        "tier": "GREEN",
        "symptoms": ["a nipple turning in (inverted nipple)", "changes in the size or shape of the breast", "an eczema-like rash on the nipple", "discharge or bleeding from the nipple", "a swelling or lump in either armpit", "an ulcer on the skin of the breast."],
        "reasoning": "Based on NHS Inform guidelines for Breast cancer (male).",
        "treatment": ["the stage and grade of the cancer", "whether the cancer cells have oestrogen receptors (are ER positive)", "whether the cancer cells have HER2 receptors (are HER2 positive) \u2013 this is not common in men"]
    },
    "breathing_problems_in_children": {
        "diagnosis": "Breathing problems in children",
        "tier": "GREEN",
        "symptoms": ["a runny or blocked nose \u2013 these are often caused by a cold or flu, but may also be caused by allergies", "a cough", "fast or irregular breathing", "flaring nostrils", "wheezing"],
        "reasoning": "Based on NHS Inform guidelines for Breathing problems in children.",
        "treatment": []
    },
    "shortness_of_breath": {
        "diagnosis": "Shortness of breath",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Shortness of breath.",
        "treatment": []
    },
    "bronchiectasis": {
        "diagnosis": "Bronchiectasis",
        "tier": "GREEN",
        "symptoms": ["a persistent cough that usually brings up mucus", "recurrent chest infections", "fatigue"],
        "reasoning": "Based on NHS Inform guidelines for Bronchiectasis.",
        "treatment": ["exercises and special devices to help you clear mucus out of your lungs", "medication to help improve airflow within the lungs", "antibiotics to treat any lung infections"]
    },
    "bronchitis": {
        "diagnosis": "Bronchitis",
        "tier": "GREEN",
        "symptoms": ["sore throat", "headache", "runny or blocked nose", "aches and pains", "tiredness", "shortness of breath or wheezing"],
        "reasoning": "Based on NHS Inform guidelines for Bronchitis.",
        "treatment": ["drink lots of fluid", "get plenty of rest", "stop smoking if you smoke", "avoid smoky environments", "take paracetamol to help headaches, fever and pain \u2013 always follow the manufacturer\u2019s instructions", "try making a honey and lemon drink to help soothe a sore throat and ease your cough"]
    },
    "bulimia_nervosa": {
        "diagnosis": "Bulimia nervosa",
        "tier": "GREEN",
        "symptoms": ["bingeing \u2013 eating an unusually large amount of food in a short time, this could be as much as or more than what a person might eat in a day", "purging \u2013 trying to reduce the effect of bingeing by attempting to get food out of your body", "fasting \u2013 trying to restrict food intake", "focus on food \u2013 thinking about food all the time, being secretive about food intake or hoarding food", "organising your life around a shopping, eating and purging cycle", "having a fear of eating in front of others", "focusing on your body shape and weight", "focusing on exercising to burn calories beyond a healthy level", "wearing baggy clothes to hide your body", "withdrawing from friends and family"],
        "reasoning": "Based on NHS Inform guidelines for Bulimia nervosa.",
        "treatment": ["your overall health and any medical needs", "your social situation, like how much support you have from family and friends", "your mental wellbeing or other mental health concerns", "any other risks that might affect you", "whether there are any physical health risks that need urgent treatment"]
    },
    "bunion_hallux_valgus": {
        "diagnosis": "Bunion (hallux valgus)",
        "tier": "GREEN",
        "symptoms": ["pain and stiffness of the big toe joint", "swelling of the big toe joint \u2013 the foot may become so wide it can be difficult to find wide enough shoes", "difficulty walking"],
        "reasoning": "Based on NHS Inform guidelines for Bunion (hallux valgus).",
        "treatment": ["your symptoms haven\u2019t improved within 12 weeks", "your symptoms are worsening"]
    },
    "cancer_and_your_emotions": {
        "diagnosis": "Cancer and your emotions",
        "tier": "GREEN",
        "symptoms": ["environment", "diet", "genetics", "physical health"],
        "reasoning": "Based on NHS Inform guidelines for Cancer and your emotions.",
        "treatment": []
    },
    "cardiac_arrest": {
        "diagnosis": "Cardiac arrest",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Cardiac arrest.",
        "treatment": []
    },
    "cardiovascular_disease": {
        "diagnosis": "Cardiovascular disease",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Cardiovascular disease.",
        "treatment": []
    },
    "carpal_tunnel_syndrome": {
        "diagnosis": "Carpal tunnel syndrome",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Carpal tunnel syndrome.",
        "treatment": []
    },
    "catarrh": {
        "diagnosis": "Catarrh",
        "tier": "GREEN",
        "symptoms": ["constant need to clear your throat", "feeling that your throat is blocked", "blocked or stuffy nose that you can\u2019t clear", "runny nose", "feeling of mucus running down the back of your throat", "persistent cough", "headache", "facial pain", "reduced sense of smell and taste", "crackling sensation in your ear and some temporary hearing loss"],
        "reasoning": "Based on NHS Inform guidelines for Catarrh.",
        "treatment": ["advice about catarrh", "over-the-counter medications such as decongestants, antihistamines or steroid nasal sprays"]
    },
    "cellulitis": {
        "diagnosis": "Cellulitis",
        "tier": "GREEN",
        "symptoms": ["red", "hot", "swollen", "painful", "tender"],
        "reasoning": "Based on NHS Inform guidelines for Cellulitis.",
        "treatment": ["take paracetamol or ibuprofen for the pain", "raise the affected area on a chair or pillow when you\u2019re sitting or lying down", "try to move the joint near the affected area, like your wrist or ankle, to stop it getting stiff", "drink plenty of fluids to avoid dehydration", "avoid wearing compression stockings until you\u2019ve recovered"]
    },
    "cerebral_palsy": {
        "diagnosis": "Cerebral palsy",
        "tier": "GREEN",
        "symptoms": ["struggle with movement and balance, and may be unable to walk", "struggle to speak, and possibly need to use electronic aids", "have difficulties with eating, drinking and swallowing", "have problems with their vision", "experience pain symptoms", "experience\u00a0fatigue\u00a0(tiredness)", "have problems with their sleep", "have\u00a0epilepsy", "have a learning disability", "display behavioural problems"],
        "reasoning": "Based on NHS Inform guidelines for Cerebral palsy.",
        "treatment": []
    },
    "cervical_cancer": {
        "diagnosis": "Cervical cancer",
        "tier": "GREEN",
        "symptoms": ["adenosquamous carcinoma", "clear cell carcinoma", "neuroendocrine carcinoma or small cell carcinoma of the cervix", "lymphoma", "sarcoma."],
        "reasoning": "Based on NHS Inform guidelines for Cervical cancer.",
        "treatment": ["instead of surgery, if you are not fit for a big operation or general anaesthetic", "after surgery, to reduce the risk of the cancer coming back."]
    },
    "cervical_spondylosis": {
        "diagnosis": "Cervical spondylosis",
        "tier": "GREEN",
        "symptoms": ["neck pain", "neck stiffness", "muscle tightness or spasms", "clicking and grinding \u2013 this is quite common and can sound alarming but is not usually serious", "headaches which usually start at the back of the head", "pain, pins and needles or numbness in your arm \u2013 this can be caused by nerve irritation in your neck"],
        "reasoning": "Based on NHS Inform guidelines for Cervical spondylosis.",
        "treatment": ["staying active", "modifying activities and pacing techniques", "maintaining a healthy weight", "stopping smoking", "managing stress and emotional wellbeing"]
    },
    "chest_and_rib_injury": {
        "diagnosis": "Chest and rib injury",
        "tier": "GREEN",
        "symptoms": ["pain", "bruising", "swelling", "clicking in the chest"],
        "reasoning": "Based on NHS Inform guidelines for Chest and rib injury.",
        "treatment": []
    },
    "chest_infection": {
        "diagnosis": "Chest infection",
        "tier": "YELLOW",
        "symptoms": ["a persistent cough", "coughing up yellow or green phlegm (thick mucus), or coughing up blood", "breathlessness or rapid and shallow breathing", "wheezing", "a high temperature (fever)", "a rapid heartbeat", "chest pain or tightness", "feeling confused and disorientated"],
        "reasoning": "Based on NHS Inform guidelines for Chest infection.",
        "treatment": []
    },
    "chickenpox": {
        "diagnosis": "Chickenpox",
        "tier": "GREEN",
        "symptoms": ["behind the ears", "on the face", "over the scalp", "on the chest and belly", "on the arms and legs"],
        "reasoning": "Based on NHS Inform guidelines for Chickenpox.",
        "treatment": ["paracetamol\u00a0to help bring down a fever", "calamine lotion and cooling gels to ease itching."]
    },
    "chilblains": {
        "diagnosis": "Chilblains",
        "tier": "GREEN",
        "symptoms": ["a burning or itching feeling in the affected areas, which can get worse if you go into a warm room", "swelling", "the affected skin turning red or dark blue", "in severe cases, the surface of the skin breaks, and sores or blisters develop"],
        "reasoning": "Based on NHS Inform guidelines for Chilblains.",
        "treatment": ["poor circulation", "a family history of chilblains", "regular exposure to cold, damp or draughty conditions", "a poor diet or low body weight", "lupus \u2013 a long-term condition that causes swelling in the body\u2019s tissues", "Raynaud\u2019s phenomenon \u2013 a common condition that affects the blood supply to certain parts of the body, usually the fingers and toes"]
    },
    "chlamydia": {
        "diagnosis": "Chlamydia",
        "tier": "GREEN",
        "symptoms": ["pain when peeing", "unusual discharge from the vagina, penis or anus", "pain in the lower tummy, bleeding after sex, and bleeding between periods", "pain in the testicles", "red, sticky eyes"],
        "reasoning": "Based on NHS Inform guidelines for Chlamydia.",
        "treatment": ["sharing sex toys that aren\u2019t washed or covered with a new condom each time they\u2019re used", "infected semen or vaginal fluid getting into your eye"]
    },
    "myalgic_encephalomyelitis_me_or_chronic_fatigue_syndrome_cfs": {
        "diagnosis": "Myalgic encephalomyelitis (ME) or chronic fatigue syndrome (CFS)",
        "tier": "GREEN",
        "symptoms": ["made worse by activity", "not caused by excessive cognitive, physical, emotional or social exertion", "not significantly relieved by rest"],
        "reasoning": "Based on NHS Inform guidelines for Myalgic encephalomyelitis (ME) or chronic fatigue syndrome (CFS).",
        "treatment": ["mild", "moderate", "severe", "very severe"]
    },
    "chronic_kidney_disease": {
        "diagnosis": "Chronic kidney disease",
        "tier": "GREEN",
        "symptoms": ["tiredness", "swollen ankles, feet or hands (due to water retention)", "shortness of breath", "nausea", "blood in the urine"],
        "reasoning": "Based on NHS Inform guidelines for Chronic kidney disease.",
        "treatment": ["are unlikely to benefit or have quality of life with treatment", "do not want to go through the inconvenience of treatment with dialysis", "are advised against dialysis because they have other serious illnesses that will shorten their life, and the negative aspects of treatment outweigh any likely benefits", "have been on dialysis but have decided to stop this treatment", "are being treated with dialysis, but have another serious physical illness, especially severe heart disease or stroke, that will shorten their life"]
    },
    "chronic_lymphocytic_leukaemia": {
        "diagnosis": "Chronic lymphocytic leukaemia",
        "tier": "GREEN",
        "symptoms": ["lymphoid stem cells make a type of white blood cell called lymphocytes", "myeloid stem cells make all the other types of blood cell. these include red blood cells, platelets, and other types of white blood cells, such as neutrophils."],
        "reasoning": "Based on NHS Inform guidelines for Chronic lymphocytic leukaemia.",
        "treatment": []
    },
    "chronic_myeloid_leukaemia": {
        "diagnosis": "Chronic myeloid leukaemia",
        "tier": "GREEN",
        "symptoms": ["lymphoid stem cells make white blood cells called lymphocytes.", "myeloid stem cells make all the other types of blood cell. these include red blood cells, platelets and other white blood cells, such as neutrophils."],
        "reasoning": "Based on NHS Inform guidelines for Chronic myeloid leukaemia.",
        "treatment": ["check the numbers of blood cells in your blood \u2013 this is called a full blood count (FBC)", "look for leukaemia cells."]
    },
    "chronic_obstructive_pulmonary_disease_copd": {
        "diagnosis": "Chronic obstructive pulmonary disease (COPD)",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Chronic obstructive pulmonary disease (COPD).",
        "treatment": ["beta-2 agonist inhalers, such as salbutamol and terbutaline", "antimuscarinic inhalers, such as ipratropium"]
    },
    "chronic_pain": {
        "diagnosis": "Chronic pain",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Chronic pain.",
        "treatment": []
    },
    "chronic_pancreatitis": {
        "diagnosis": "Chronic pancreatitis",
        "tier": "GREEN",
        "symptoms": ["weight loss", "loss of appetite", "jaundice\u00a0(yellowing of the skin and eyes)", "symptoms of diabetes \u2013 such as feeling very thirsty, urinating frequently and feeling very tired", "ongoing nausea and vomiting"],
        "reasoning": "Based on NHS Inform guidelines for Chronic pancreatitis.",
        "treatment": []
    },
    "cirrhosis": {
        "diagnosis": "Cirrhosis",
        "tier": "GREEN",
        "symptoms": ["fever and shivering", "shortness of breath", "vomiting blood", "very dark or black, tarry stools (faeces)", "periods of confusion or drowsiness"],
        "reasoning": "Based on NHS Inform guidelines for Cirrhosis.",
        "treatment": []
    },
    "clavicle_collar_bone_fracture": {
        "diagnosis": "Clavicle (collar bone) fracture",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Clavicle (collar bone) fracture.",
        "treatment": []
    },
    "clostridium_difficile": {
        "diagnosis": "Clostridium difficile",
        "tier": "GREEN",
        "symptoms": ["watery diarrhoea, which can be bloody", "painful tummy cramps", "feeling sick", "signs of dehydration, such as\u00a0a dry mouth,\u00a0headaches and peeing less often than normal", "a high temperature (fever) of above 38c (100.4f)", "loss of appetite and weight loss"],
        "reasoning": "Based on NHS Inform guidelines for Clostridium difficile.",
        "treatment": ["stopping\u00a0the antibiotics thought to be causing the infection, if possible \u2013 in mild cases, this may be the only treatment that\u2019s needed", "taking a 10 to 14-day course of antibiotics that are known to kill C. difficile bacteria", "rarely,\u00a0serious\u00a0infections may\u00a0require\u00a0surgery to remove a damaged section of the bowel"]
    },
    "coeliac_disease": {
        "diagnosis": "Coeliac disease",
        "tier": "GREEN",
        "symptoms": ["irritable bowel syndrome (ibs)", "wheat intolerance", "stress", "just getting older"],
        "reasoning": "Based on NHS Inform guidelines for Coeliac disease.",
        "treatment": ["irritable bowel syndrome (IBS)", "wheat intolerance", "stress", "just getting older"]
    },
    "cold_sore": {
        "diagnosis": "Cold sore",
        "tier": "GREEN",
        "symptoms": ["swollen and irritated gums with small, painful sores in and around the mouth \u2013 this is known as herpes simplex gingivostomatitis", "sore throat and swollen glands", "producing more saliva than normal", "high temperature (fever) of 38c (100.4f) or above", "dehydration", "feeling sick (nausea)", "headaches"],
        "reasoning": "Based on NHS Inform guidelines for Cold sore.",
        "treatment": ["eat cool, soft foods", "wash your hands with soap and water before and after applying cream", "avoid anything that triggers your cold sores", "use sunblock lip balm (SPF 15 or above) if you\u2019re outside in the sun", "use an antiseptic mouthwash if brushing your teeth is painful", "take paracetamol or ibuprofen to ease pain and swelling (both come in liquid form for young children) \u2013 do not give aspirin to children under 16", "drink plenty of fluids to avoid dehydration"]
    },
    "coma": {
        "diagnosis": "Coma",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Coma.",
        "treatment": []
    },
    "common_cold": {
        "diagnosis": "Common cold",
        "tier": "GREEN",
        "symptoms": ["a sore throat", "a blocked or runny nose", "sneezing", "a cough", "a hoarse voice", "generally feeling unwell"],
        "reasoning": "Based on NHS Inform guidelines for Common cold.",
        "treatment": ["rest", "drink plenty of fluids", "eat healthily", "take over-the-counter pain relief, such as paracetamol or ibuprofen, to relieve high temperature and aches", "use decongestant sprays or tablets to relieve a blocked nose", "try remedies such as gargling salt water and sucking on menthol sweets"]
    },
    "complications_of_type_1_diabetes": {
        "diagnosis": "Complications of type 1 diabetes",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Complications of type 1 diabetes.",
        "treatment": []
    },
    "concussion": {
        "diagnosis": "Concussion",
        "tier": "GREEN",
        "symptoms": ["lose consciousness", "be confused", "have a blank expression", "take an unusually long amount of time to answer questions", "struggle to balance", "show inappropriate emotional responses, like laughing or crying without explanation", "act out of character, like being unusually irritable", "struggle to remember events before or after the injury"],
        "reasoning": "Based on NHS Inform guidelines for Concussion.",
        "treatment": []
    },
    "congenital_heart_disease": {
        "diagnosis": "Congenital heart disease",
        "tier": "GREEN",
        "symptoms": ["cyanotic heart disease", "acyanotic heart disease"],
        "reasoning": "Based on NHS Inform guidelines for Congenital heart disease.",
        "treatment": ["fever", "chills", "sweating (including night sweats)", "muscular aches and pains", "chest pain", "coughs", "weakness and fatigue", "headache"]
    },
    "congenital_muscular_dystrophy_cmd": {
        "diagnosis": "Congenital muscular dystrophy (CMD)",
        "tier": "GREEN",
        "symptoms": ["low muscle tone or floppiness (hypotonia) at birth", "tightness (contractures) of the ankles, hips, knees and elbows", "respiratory (breathing) problems because of weakness of breathing muscles", "eye problems", "learning difficulties"],
        "reasoning": "Based on NHS Inform guidelines for Congenital muscular dystrophy (CMD).",
        "treatment": ["physiotherapy to work on muscle strength and flexibility", "physical aids like a walking stick, crutches or a wheelchair", "occupational therapy to help maintain independence", "leg splints to help your child walk"]
    },
    "conjunctivitis": {
        "diagnosis": "Conjunctivitis",
        "tier": "GREEN",
        "symptoms": ["inflammation", "redness", "itching", "a burning or gritty feeling", "watering", "pus that sticks to the eyelashes"],
        "reasoning": "Based on NHS Inform guidelines for Conjunctivitis.",
        "treatment": ["Self-help guide: Eye problems"]
    },
    "constipation": {
        "diagnosis": "Constipation",
        "tier": "GREEN",
        "symptoms": ["stomach ache and cramps", "feeling bloated", "feeling\u00a0sick", "loss of appetite"],
        "reasoning": "Based on NHS Inform guidelines for Constipation.",
        "treatment": ["you notice any rectal bleeding", "you notice any unexplained weight loss", "you have persistent tiredness", "your\u00a0constipation lasts longer than 14 days without improvement"]
    },
    "coronary_heart_disease": {
        "diagnosis": "Coronary heart disease",
        "tier": "GREEN",
        "symptoms": ["chest pain (angina)", "shortness of breath", "pain throughout the body", "feeling faint", "feeling sick (nausea)"],
        "reasoning": "Based on NHS Inform guidelines for Coronary heart disease.",
        "treatment": []
    },
    "coronavirus_covid_19": {
        "diagnosis": "Coronavirus (COVID-19)",
        "tier": "GREEN",
        "symptoms": ["a new continuous cough", "sneezing", "a blocked or runny nose", "a sore throat", "a headache", "muscle aches", "shortness of breath, tight chest or wheezing", "a high temperature (fever) \u2013 this is usually about 38\u00b0c or higher (100.4\u00b0f)", "feeling generally unwell", "feeling tired or have a lack of energy"],
        "reasoning": "Based on NHS Inform guidelines for Coronavirus (COVID-19).",
        "treatment": ["rest", "drink plenty of fluids", "eat healthily", "take over-the-counter pain relief, such as paracetamol or ibuprofen, to help with high temperature and aches", "use decongestant sprays or tablets to relieve a blocked nose", "use extra pillows to raise your head while sleeping to make breathing easier and clear your chest of mucus", "try remedies such as gargling salt water and sucking on menthol sweets"]
    },
    "long_term_effects_of_covid_19_long_covid": {
        "diagnosis": "Long-term effects of COVID-19 (long COVID)",
        "tier": "GREEN",
        "symptoms": ["about nhs inform", "editorial policy", "how this information was written"],
        "reasoning": "Based on NHS Inform guidelines for Long-term effects of COVID-19 (long COVID).",
        "treatment": []
    },
    "costochondritis": {
        "diagnosis": "Costochondritis",
        "tier": "GREEN",
        "symptoms": ["certain positions or activities, like wearing a seatbelt or hugging someone", "deep breathing", "coughing and sneezing"],
        "reasoning": "Based on NHS Inform guidelines for Costochondritis.",
        "treatment": ["pain medication \u2013 this can help you move more comfortably, which can help your recovery", "heat packs"]
    },
    "cough": {
        "diagnosis": "Cough",
        "tier": "GREEN",
        "symptoms": ["rest", "drink plenty of fluids", "take painkillers such as paracetamol or ibuprofen \u2013 always read the manufacturer\u2019s instructions"],
        "reasoning": "Based on NHS Inform guidelines for Cough.",
        "treatment": ["you have severe difficulty breathing \u2013 for example, you struggle to speak without pausing, gasping or choking", "you have severe chest pain in the middle of your chest that isn\u2019t going away \u2013 it may feel like pressure, tightness or squeezing", "you have pain that spreads to your arms, back, neck and jaw", "you feel more drowsy than usual or find it more difficult to wake up", "your lips or skin are turning very pale, blue or grey \u2013 on brown or black skin this is easier to see on the palms of your hands"]
    },
    "crohn_s_disease": {
        "diagnosis": "Crohn’s disease",
        "tier": "GREEN",
        "symptoms": ["recurring\u00a0diarrhoea", "abdominal pain\u00a0and cramping, which is usually worse after eating", "extreme tiredness (fatigue)", "unintended weight loss", "blood and mucus in your poo"],
        "reasoning": "Based on NHS Inform guidelines for Crohn’s disease.",
        "treatment": ["itchy skin", "a high temperature", "joint and muscle pain", "swelling of the hands or lips", "problems swallowing"]
    },
    "croup": {
        "diagnosis": "Croup",
        "tier": "GREEN",
        "symptoms": ["has lips or skin that are turning pale, blue or grey \u2013 on brown or black skin this is easier to see on the palms of their hands", "has severe difficulty breathing \u2013 they may make grunting noises or suck their stomach in under their ribcage", "is breathing fast or stops or pauses", "is pulling in at their throat area (tracheal tug) or their windpipe is more prominent", "is limp, floppy or not responding like they normally do \u2013 they may find it difficult to focus on you or are more difficult to wake up than usual", "is less than 3 months old and has a temperature of 38\u00b0c (101\u00b0f) or above and has not had a vaccination in the past 2 days", "is less than 3 months old and has a temperature of 36\u00b0c (97\u00b0f) or less and has not had a vaccination in the past 2 days"],
        "reasoning": "Based on NHS Inform guidelines for Croup.",
        "treatment": ["influenza A and B (flu viruses)", "the measles virus, in children who have not been immunised against measles", "the rhinovirus (common cold virus)", "enteroviruses", "the respiratory syncytial virus (RSV), which can cause severe breathing problems and pneumonia in babies"]
    },
    "cystic_fibrosis": {
        "diagnosis": "Cystic fibrosis",
        "tier": "GREEN",
        "symptoms": ["recurring\u00a0chest infections", "difficulty putting on weight", "frequent, wet-sounding\u00a0coughs", "diarrhoea", "occasional wheezing and\u00a0shortness of breath"],
        "reasoning": "Based on NHS Inform guidelines for Cystic fibrosis.",
        "treatment": ["antibiotics\u00a0to prevent and treat\u00a0chest infections", "medicines\u00a0to\u00a0make the mucus in the lungs thinner and easier to cough up", "medicines to widen the airways and reduce inflammation", "special techniques and devices to help clear mucus from the lungs", "medicines that help the person absorb food better", "following a special diet and taking supplements to prevent malnutrition"]
    },
    "cystitis": {
        "diagnosis": "Cystitis",
        "tier": "GREEN",
        "symptoms": ["pain, burning or stinging when you pee", "needing to pee more often and urgently than normal", "feeling like you need to pee again soon after going to the toilet", "pee that\u2019s dark, cloudy or strong-smelling", "pain low down in your tummy", "feeling generally unwell, achy, sick and tired", "blood in your urine"],
        "reasoning": "Based on NHS Inform guidelines for Cystitis.",
        "treatment": ["take over-the-counter painkillers, like paracetamol or ibuprofen \u2013 always read the medicine information leaflet beforehand to check whether you can take it, and check with your pharmacist if you\u2019re not sure", "drink plenty of water", "use a hot water bottle \u2013 holding a hot water bottle on your tummy or between your thighs may reduce any discomfort", "avoid having sex", "avoid drinks that may irritate your bladder, like fruit juices, coffee and alcohol", "pee frequently"]
    },
    "deafblindness": {
        "diagnosis": "Deafblindness",
        "tier": "GREEN",
        "symptoms": ["not hearing you if you speak to them from behind", "needing to turn up the volume on the television or radio", "difficulty following a conversation\u00a0\u2013 particularly if several people are speaking or the person they\u2019re speaking to is unfamiliar", "not hearing noises around them, such as a\u00a0knock at the door or the doorbell ringing", "asking others to speak loudly, slowly and\u00a0more clearly", "leaning in very close to hear what\u2019s being said"],
        "reasoning": "Based on NHS Inform guidelines for Deafblindness.",
        "treatment": []
    },
    "deep_vein_thrombosis": {
        "diagnosis": "Deep vein thrombosis",
        "tier": "GREEN",
        "symptoms": ["tenderness", "throbbing pain \u2013 if the clot is in your leg, pain is usually in the calf or thigh when walking or standing up, and pain may be worse when you bend your foot upwards towards your knee", "a heavy ache in the affected area", "red or darkened skin around the painful area \u2013 depending on your skin tone this may be difficult to see", "warm skin around the painful area", "swollen veins that are hard or sore when you touch them"],
        "reasoning": "Based on NHS Inform guidelines for Deep vein thrombosis.",
        "treatment": ["eat a healthy, balanced diet", "keep active", "stay a healthy weight"]
    },
    "degenerative_cervical_myelopathy": {
        "diagnosis": "Degenerative cervical myelopathy",
        "tier": "GREEN",
        "symptoms": ["pain or stiffness in the neck", "tingling or numbness in the arms or legs (often starting in fingertips or toes) or less commonly in the body", "change or loss in the manual coordination or dexterity in the hands (e.g. fastening buttons or tying shoelaces)", "pain, weakness or heaviness in the arms or legs", "imbalance or feeling unsteady which may lead to falls", "difficulty walking", "change of bladder or bowel function, such as increased urgency or incontinence"],
        "reasoning": "Based on NHS Inform guidelines for Degenerative cervical myelopathy.",
        "treatment": ["Myelopathy.org"]
    },
    "dehydration": {
        "diagnosis": "Dehydration",
        "tier": "YELLOW",
        "symptoms": ["feeling thirsty", "having dark yellow, strong-smelling pee (urine)", "peeing less often than usual (less than 3 or 4 times a day)", "feeling dizzy or lightheaded", "headache", "feeling tired", "a\u00a0dry mouth, lips and eyes", "sunken eyes"],
        "reasoning": "Based on NHS Inform guidelines for Dehydration.",
        "treatment": ["Breathing problems in children"]
    },
    "delirium": {
        "diagnosis": "Delirium",
        "tier": "GREEN",
        "symptoms": ["being confused (or more confused than normal)", "being sleepy and less responsive", "being very agitated or restless", "a change in sleeping pattern (like being awake at night and sleeping during the day)", "suspiciousness or a loss of trust", "seeing or hearing things that aren\u2019t real"],
        "reasoning": "Based on NHS Inform guidelines for Delirium.",
        "treatment": ["rehabilitation", "engagement with them", "hydration", "nutrition"]
    },
    "dementia": {
        "diagnosis": "Dementia",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Dementia.",
        "treatment": []
    },
    "dementia_with_lewy_bodies": {
        "diagnosis": "Dementia with Lewy bodies",
        "tier": "GREEN",
        "symptoms": ["thinking speed", "language", "understanding", "judgement", "memory (although significant memory loss may not occur until later on)"],
        "reasoning": "Based on NHS Inform guidelines for Dementia with Lewy bodies.",
        "treatment": ["what support you or your carer need for you to remain as independent as possible", "whether there are any changes that need to be made to your home to make it easier to live in", "whether you need any financial assistance"]
    },
    "dental_abscess": {
        "diagnosis": "Dental abscess",
        "tier": "GREEN",
        "symptoms": ["an intense, throbbing pain in the affected tooth or gum that may come on suddenly and gets gradually worse", "pain that spreads to your ear, jaw and neck on the same side as the affected tooth or gum", "pain that\u2019s worse when lying down, which may disturb your sleep", "redness and swelling in your face", "a tender, discoloured and/or loose tooth", "shiny, red and swollen gums", "sensitivity to hot or cold food and drink", "bad breath and/or an unpleasant taste in your mouth"],
        "reasoning": "Based on NHS Inform guidelines for Dental abscess.",
        "treatment": ["removing the affected tooth (extraction) \u2013 this may be necessary if root canal treatment isn\u2019t possible", "root canal treatment \u2013 a procedure to remove the abscess from the root of an affected tooth before filling and sealing it", "incision and drainage \u2013 where a small cut (incision) is made in the gum to drain the abscess (this is usually only a temporary solution)"]
    },
    "depression": {
        "diagnosis": "Depression",
        "tier": "GREEN",
        "symptoms": ["continuous sadness or low mood", "irritable", "guilty", "hopeless", "tired or low in energy", "emotional or tearful", "anxious", "angry or frustrated about small things", "negative about yourself (low self-esteem)", "low confidence in yourself"],
        "reasoning": "Based on NHS Inform guidelines for Depression.",
        "treatment": ["cognitive behavioural therapy (CBT)", "computerised CBT (CCBT)", "interpersonal therapy (IPT)", "psychodynamic psychotherapy", "counselling"]
    },
    "dermatitis_herpetiformis": {
        "diagnosis": "Dermatitis herpetiformis",
        "tier": "GREEN",
        "symptoms": ["red, raised patches often with blisters that burst with scratching", "severe itching and often stinging"],
        "reasoning": "Based on NHS Inform guidelines for Dermatitis herpetiformis.",
        "treatment": ["Sulphapyridine", "Sulphamethoxypyridazine"]
    },
    "diabetic_foot_issues": {
        "diagnosis": "Diabetic foot issues",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Diabetic foot issues.",
        "treatment": []
    },
    "diabetic_ketoacidosis_dka": {
        "diagnosis": "Diabetic ketoacidosis (DKA)",
        "tier": "GREEN",
        "symptoms": ["the smell of ketones on breath (this may smell like pear drops or nail polish remover)", "deep breathing", "abdominal (stomach) pain", "nausea and vomiting"],
        "reasoning": "Based on NHS Inform guidelines for Diabetic ketoacidosis (DKA).",
        "treatment": ["insulin", "fluids", "nutrients"]
    },
    "diabetic_retinopathy": {
        "diagnosis": "Diabetic retinopathy",
        "tier": "GREEN",
        "symptoms": ["gradually worsening vision", "sudden vision loss", "shapes floating in your field of vision (floaters)", "blurred or patchy vision", "eye pain or redness"],
        "reasoning": "Based on NHS Inform guidelines for Diabetic retinopathy.",
        "treatment": ["laser treatment", "injections of medication into your eyes", "an operation to remove blood or scar tissue from your eyes"]
    },
    "diarrhoea_in_adults": {
        "diagnosis": "Diarrhoea in adults",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Diarrhoea in adults.",
        "treatment": ["may have swallowed something poisonous", "have a stiff neck and pain when looking at bright lights", "have a sudden, severe headache or stomach ache", "have blue, grey, pale or blotchy skin, lips or tongue \u2013 on brown or black skin this may be easier to see on the palms of the hands or soles of the feet", "are having severe difficulty breathing, or taking lots of quick, short breaths", "are confused or not responding as usual"]
    },
    "diarrhoea_in_children_and_babies": {
        "diagnosis": "Diarrhoea in children and babies",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Diarrhoea in children and babies.",
        "treatment": ["may have swallowed something poisonous", "has a stiff neck and pain when looking at bright lights", "has a sudden, severe headache or stomach ache", "is having severe difficulty breathing, or taking lots of quick, short breaths", "has blue, grey, pale or blotchy skin, lips or tongue \u2013 on brown or black skin this may be easier to see on the palms of the hands or soles of the feet", "feels unusually cold to touch", "has a fit (seizure)", "has a rash that does not fade when you press a glass against it (use the \u2018glass test\u2018 from Meningitis Now)"]
    },
    "discoid_eczema": {
        "diagnosis": "Discoid eczema",
        "tier": "GREEN",
        "symptoms": ["it\u2019s blistered, crusty, leaking fluid or has spots filled with pus", "it\u2019s painful, swollen or feels warm", "it suddenly gets worse or bigger", "you have a high temperature or feel unwell"],
        "reasoning": "Based on NHS Inform guidelines for Discoid eczema.",
        "treatment": ["emollients \u2013 moisturisers that can be applied to the skin to stop it becoming dry", "topical corticosteroids \u2013 ointments and creams that can be applied to the skin", "oral corticosteroids \u2013 anti-inflammatory medicines", "antibiotics \u2013 used to treat infected eczema", "antihistamines \u2013 to help reduce itching", "soap substitutes \u2013 to replace soaps and cleaning products that may irritate your skin"]
    },
    "diverticular_disease_and_diverticulitis": {
        "diagnosis": "Diverticular disease and diverticulitis",
        "tier": "GREEN",
        "symptoms": ["a change in your normal bowel habits, such as\u00a0constipation or diarrhoea, or episodes of constipation that are followed by diarrhoea \u2013 a classic pattern is multiple trips to the toilet in the morning to pass stools like \u2018rabbit pellets\u2019", "bloating"],
        "reasoning": "Based on NHS Inform guidelines for Diverticular disease and diverticulitis.",
        "treatment": ["your pain cannot be controlled using paracetamol", "you are unable to drink enough fluids to keep yourself hydrated", "you are unable to take antibiotics by mouth", "your general state of health is poor", "you have a weakened immune system", "your GP suspects complications", "your symptoms fail to improve after 2 days of treatment at home"]
    },
    "dizziness_lightheadedness": {
        "diagnosis": "Dizziness (lightheadedness)",
        "tier": "GREEN",
        "symptoms": ["lie down until the dizziness passes, then get up slowly", "move slowly and carefully", "get plenty of rest", "drink plenty of fluids, especially water", "avoid coffee, cigarettes, alcohol and drugs"],
        "reasoning": "Based on NHS Inform guidelines for Dizziness (lightheadedness).",
        "treatment": ["lie down until the dizziness passes, then get up slowly", "move slowly and carefully", "get plenty of rest", "drink plenty of fluids, especially water", "avoid coffee, cigarettes, alcohol and drugs"]
    },
    "down_s_syndrome": {
        "diagnosis": "Down’s syndrome",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Down’s syndrome.",
        "treatment": []
    },
    "dry_mouth": {
        "diagnosis": "Dry mouth",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Dry mouth.",
        "treatment": []
    },
    "duchenne_muscular_dystrophy_dmd": {
        "diagnosis": "Duchenne muscular dystrophy (DMD)",
        "tier": "GREEN",
        "symptoms": ["difficulties running, jumping and climbing stairs", "difficulty getting up from the floor", "a waddling gait (walking on their toes with an arched lower back)", "difficulty walking as fast or as far as other children", "a tendency to fall more than other children", "learning and behavioural difficulties", "learning to speak later than usual"],
        "reasoning": "Based on NHS Inform guidelines for Duchenne muscular dystrophy (DMD).",
        "treatment": ["have poor mobility", "spend a lot of time sitting down"]
    },
    "dystonia": {
        "diagnosis": "Dystonia",
        "tier": "GREEN",
        "symptoms": ["uncontrolled muscle spasms", "parts of your body twisting into unusual positions \u2013 like your neck being pulled to the side or your feet turning inwards", "shaking (tremors)", "excessive blinking"],
        "reasoning": "Based on NHS Inform guidelines for Dystonia.",
        "treatment": []
    },
    "eating_disorders": {
        "diagnosis": "Eating disorders",
        "tier": "GREEN",
        "symptoms": ["spending a lot of time worrying about your weight, body shape and food", "avoiding socialising if it involves food", "eating very little or a large quantity of food", "feeling that your eating is out of control", "making yourself sick or taking laxatives after you eat", "exercising too much", "having very strict habits or routines around food", "changes in your mood like being withdrawn, anxious or depressed", "difficulty concentrating on day to day activities like work or study"],
        "reasoning": "Based on NHS Inform guidelines for Eating disorders.",
        "treatment": ["Beat: What to do if you\u2019re worried about a friend or family member", "Beat: What to do if you\u2019re worried about a colleague", "Supported: I care for someone with an eating disorder", "FEAST: Info for parents"]
    },
    "earache": {
        "diagnosis": "Earache",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Earache.",
        "treatment": ["a high temperature (fever)", "vomiting", "a severe sore throat", "hearing loss", "swelling around the ear", "discharge from the ear", "there is something stuck in your or your child\u2019s ear", "the earache doesn\u2019t improve within a few days"]
    },
    "early_miscarriage": {
        "diagnosis": "Early miscarriage",
        "tier": "GREEN",
        "symptoms": ["vaginal bleeding", "stomach pain or cramping", "pregnancy symptoms suddenly stopping"],
        "reasoning": "Based on NHS Inform guidelines for Early miscarriage.",
        "treatment": []
    },
    "earwax_build_up": {
        "diagnosis": "Earwax build-up",
        "tier": "GREEN",
        "symptoms": ["earache", "hearing loss", "tinnitus (hearing sounds from inside your body)", "itchiness in or around the ear", "ear infections"],
        "reasoning": "Based on NHS Inform guidelines for Earwax build-up.",
        "treatment": ["ear irrigation \u2013 a quick and painless procedure where an electric pump is used to push water into your ear and wash the earwax out", "microsuction \u2013 a quick and painless procedure where a small device is used to suck the earwax out of your ear (you may need to be referred for this)"]
    },
    "ebola_virus_disease": {
        "diagnosis": "Ebola virus disease",
        "tier": "GREEN",
        "symptoms": ["a high temperature (fever)", "a\u00a0headache", "joint and muscle pain", "a\u00a0sore throat", "severe muscle weakness"],
        "reasoning": "Based on NHS Inform guidelines for Ebola virus disease.",
        "treatment": []
    },
    "ectopic_pregnancy": {
        "diagnosis": "Ectopic pregnancy",
        "tier": "GREEN",
        "symptoms": ["pain in your lower abdomen (tummy) \u2013 this might come on quickly or gradually, and can be widespread or on one side only", "vaginal bleeding \u2013 this might be like your normal period or it may be lighter or heavier or darker than normal", "upset stomach", "sudden diarrhoea", "pain when you pee, that may feel like a urinary tract infection (uti)", "pain when you poo, or in your back passage", "new pain in the tip of your shoulder"],
        "reasoning": "Based on NHS Inform guidelines for Ectopic pregnancy.",
        "treatment": ["the urgency of your surgery", "the damage that your ectopic pregnancy may have caused", "your plans for a future pregnancy"]
    },
    "elbow_radial_head_or_neck_fracture": {
        "diagnosis": "Elbow (radial head or neck) fracture",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Elbow (radial head or neck) fracture.",
        "treatment": []
    },
    "edwards_syndrome": {
        "diagnosis": "Edwards’ syndrome",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Edwards’ syndrome.",
        "treatment": []
    },
    "emery_dreifuss_muscular_dystrophy": {
        "diagnosis": "Emery-Dreifuss muscular dystrophy",
        "tier": "GREEN",
        "symptoms": ["early development of muscle contractures (muscle tightness)", "the spread of muscle weakness", "the effect on the heart", "spinal rigidity (lack of movement in the spine)"],
        "reasoning": "Based on NHS Inform guidelines for Emery-Dreifuss muscular dystrophy.",
        "treatment": ["have poor mobility", "spend a lot of time sitting down"]
    },
    "endometriosis": {
        "diagnosis": "Endometriosis",
        "tier": "GREEN",
        "symptoms": ["pain in the lower stomach, pelvis, lower back or legs", "painful periods which affect your day to day life \u2013 for example, you can\u2019t go to school or work or take part in activities that you enjoy", "pain during ovulation", "heavy or long lasting periods", "pain during and after sex", "pain or bleeding when going to the toilet (pain before or after peeing or pooing)", "bleeding from your back passage (rectum)", "blood in your poo (usually at the same time as your period)", "bloating", "persistent exhaustion and tiredness"],
        "reasoning": "Based on NHS Inform guidelines for Endometriosis.",
        "treatment": ["contraceptive pill (the pill)", "progesterone-only pill (mini pill)", "contraceptive patch", "contraceptive injection", "intrauterine system (IUS)", "Gonadotropin-releasing hormone (GnRH) analogues"]
    },
    "epilepsy": {
        "diagnosis": "Epilepsy",
        "tier": "GREEN",
        "symptoms": ["the seizure lasts longer than 5 minutes", "the person has more than one seizure without recovering in between", "the person is having a seizure for the first time", "the person is injured, has breathing problems, or needs emergency medical attention for any other reason", "the person\u2019s behaviour after a seizure means they\u2019re violent, agitated, confused or are a danger to themselves"],
        "reasoning": "Based on NHS Inform guidelines for Epilepsy.",
        "treatment": []
    },
    "erectile_dysfunction_impotence": {
        "diagnosis": "Erectile dysfunction (impotence)",
        "tier": "GREEN",
        "symptoms": ["conditions affecting the flow of blood to your penis\u00a0\u2013 vasculogenic", "conditions affecting your nervous system, which is made up of your brain, nerves and spinal cord \u2013 neurogenic", "conditions affecting your hormone levels \u2013 hormonal", "conditions affecting the physical structure of your penis\u00a0\u2013 anatomical"],
        "reasoning": "Based on NHS Inform guidelines for Erectile dysfunction (impotence).",
        "treatment": ["your self-esteem (the way you feel about yourself)", "your sexuality", "your personal relationships"]
    },
    "escherichia_coli_e_coli_o157": {
        "diagnosis": "Escherichia coli (E. coli) O157",
        "tier": "GREEN",
        "symptoms": ["peeing less", "tiredness", "swelling", "bruising"],
        "reasoning": "Based on NHS Inform guidelines for Escherichia coli (E. coli) O157.",
        "treatment": ["wash your hands thoroughly with soap in running water and dry them completely \u2013 use liquid soap and warm water if you can", "everyone must wash their hands after contact with an infected person, particularly after handling their clothes or bedding", "always wash your hands after going to the toilet or changing babies\u2019 nappies, and before preparing or serving food or eating meals", "if you\u2019ve been infected, avoid cooking or preparing food until 48 hours after your symptoms have cleared up", "wash soiled clothing and bed linen separately from other clothes in a washing machine at the highest temperature possible (for example 60\u00b0C)", "wipe down the outside of the washing machine with hot water and detergent after any heavily soiled load", "clean toilet seats, toilet flush handles, basin taps, surfaces and toilet door handles at least daily, preferably more often, using hot water and detergent", "disinfection sprays and wipes or alcohol-based wipes may be used on toilet seats and other surfaces, but only after any visible soiling has been removed"]
    },
    "ewing_sarcoma": {
        "diagnosis": "Ewing sarcoma",
        "tier": "GREEN",
        "symptoms": ["bone sarcomas (also called primary bone cancer)", "soft tissue sarcoma."],
        "reasoning": "Based on NHS Inform guidelines for Ewing sarcoma.",
        "treatment": ["getting pregnant after treatment", "making someone else pregnant after treatment", "LGBTQ+ people and cancer treatment"]
    },
    "excessive_sweating_hyperhidrosis": {
        "diagnosis": "Excessive sweating (hyperhidrosis)",
        "tier": "GREEN",
        "symptoms": ["wear loose, light clothing", "wear socks that absorb moisture \u2013 like sports socks", "change your socks at least twice a day", "try to wear shoes made of leather", "alternate your shoes each day"],
        "reasoning": "Based on NHS Inform guidelines for Excessive sweating (hyperhidrosis).",
        "treatment": ["strong antiperspirants", "armpit or sweat shields to absorb excessive sweat and protect your clothing", "foot powders for sweaty feet", "soap substitutes that are more gentle on your skin"]
    },
    "eye_cancer": {
        "diagnosis": "Eye cancer",
        "tier": "GREEN",
        "symptoms": ["uveal melanoma, which starts in the uvea. this is the most common type of eye melanoma.", "conjunctival melanoma, which starts on the conjunctiva. this is a rarer type of eye melanoma."],
        "reasoning": "Based on NHS Inform guidelines for Eye cancer.",
        "treatment": ["Call the Macmillan Support Line fior free on 0808 808 00 00.", "Chat to our specialists online.", "Visit our eye cancer forum to talk with people who have been affected by eye cancer, share your experience, and ask an expert your questions."]
    },
    "facioscapulohumeral_muscular_dystrophy_fshd": {
        "diagnosis": "Facioscapulohumeral muscular dystrophy (FSHD)",
        "tier": "GREEN",
        "symptoms": ["their eyes being slightly open when sleeping", "not being able to squeeze their eyes shut tightly", "not being able to purse their lips"],
        "reasoning": "Based on NHS Inform guidelines for Facioscapulohumeral muscular dystrophy (FSHD).",
        "treatment": ["have poor mobility", "spend a lot of time sitting down"]
    },
    "farting": {
        "diagnosis": "Farting",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Farting.",
        "treatment": []
    },
    "febrile_seizures": {
        "diagnosis": "Febrile seizures",
        "tier": "GREEN",
        "symptoms": ["become stiff", "twitch their arms and legs", "lose consciousness", "wet or soil themselves", "vomit or foam at the mouth", "roll their eyes back"],
        "reasoning": "Based on NHS Inform guidelines for Febrile seizures.",
        "treatment": ["chickenpox", "flu", "middle ear infections", "tonsilitis", "a urinary tract infection (UTI)"]
    },
    "feeling_of_something_in_your_throat_globus": {
        "diagnosis": "Feeling of something in your throat (Globus)",
        "tier": "GREEN",
        "symptoms": ["tightness or a pressure in your throat", "mucus that you cannot clear (catarrh)", "an area of discomfort in your throat", "a feeling of something stuck or a lump in your throat"],
        "reasoning": "Based on NHS Inform guidelines for Feeling of something in your throat (Globus).",
        "treatment": ["drink at least 1.5 litres (3 pints) of water every day \u2013 drink in small sips as swallowing helps to relax the throat", "avoid too much alcohol, tea, coffee and fizzy drinks", "reduce the amount of fatty and spicy food in your diet", "leave at least 3 hours between your last meal and going to bed", "try anti-reflux medication (ask a pharmacist for advice)"]
    },
    "fever_in_adults": {
        "diagnosis": "Fever in adults",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Fever in adults.",
        "treatment": ["have a weakened immune system", "are on immune-suppressant drugs, such as regular steroids, methotrexate, azathioprine or cyclophosphamide", "are on, or recently completed, treatment for cancer, leukaemia or lymphoma", "are a transplant recipient", "are HIV positive", "have chronic lung disease", "have asthma which has been treated with medication in the last 3 years", "have heart disease (excluding blood pressure which is currently well controlled)"]
    },
    "fever_in_children": {
        "diagnosis": "Fever in children",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Fever in children.",
        "treatment": []
    },
    "fibroids": {
        "diagnosis": "Fibroids",
        "tier": "GREEN",
        "symptoms": ["heavy periods", "painful periods", "tummy (abdominal) pain", "lower back pain", "a frequent need to urinate", "constipation", "pain or discomfort during sex", "symptoms which are affecting your day to day life"],
        "reasoning": "Based on NHS Inform guidelines for Fibroids.",
        "treatment": ["over-the-counter pain relief like ibuprofen", "the\u00a0contraceptive pill which can reduce heavy menstrual bleeding", "medication taken only during your period that can reduce heavy menstrual bleeding", "medicines that can shrink fibroids by lowering your oestrogen and progesterone levels", "in rare cases, surgery"]
    },
    "fibromyalgia": {
        "diagnosis": "Fibromyalgia",
        "tier": "GREEN",
        "symptoms": ["an ache", "a burning sensation", "a sharp stabbing pain", "a mixture of these 3 feelings"],
        "reasoning": "Based on NHS Inform guidelines for Fibromyalgia.",
        "treatment": []
    },
    "flat_feet_in_children_and_young_people": {
        "diagnosis": "Flat feet in children and young people",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Flat feet in children and young people.",
        "treatment": []
    },
    "flu": {
        "diagnosis": "Flu",
        "tier": "GREEN",
        "symptoms": ["a sudden high temperature", "tiredness and weakness", "a headache", "general aches and pains", "a dry, chesty cough", "sore throat", "difficulty sleeping", "loss of appetite", "diarrhoea or tummy pain", "feeling sick and being sick"],
        "reasoning": "Based on NHS Inform guidelines for Flu.",
        "treatment": ["you have severe difficulty breathing \u2013 for example, you struggle to speak without pausing, gasping or choking", "you have severe chest pain in the middle of your chest that isn\u2019t going away \u2013 it may feel like pressure, tightness or squeezing", "you have pain that spreads to your arms, back, neck and jaw", "you feel more drowsy than usual or find it more difficult to wake up", "your lips or skin are turning very pale, blue or grey \u2013 on brown or black skin this is easier to see on the palms of your hands"]
    },
    "alcohol_and_pregnancy": {
        "diagnosis": "Alcohol and pregnancy",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Alcohol and pregnancy.",
        "treatment": []
    },
    "food_allergy": {
        "diagnosis": "Food allergy",
        "tier": "GREEN",
        "symptoms": ["tingling or itching in the mouth", "a raised, itchy red rash (urticarial) \u2013 in some cases, the skin can turn red and itchy, but without a raised rash", "swelling of the face, mouth\u00a0(angioedema), throat\u00a0or other areas of the body", "difficulty swallowing", "wheezing or shortness of breath", "feeling\u00a0dizzy and lightheaded", "feeling sick (nausea) or vomiting", "abdominal pain or\u00a0diarrhoea", "hay fever-like symptoms, such as sneezing or itchy eyes\u00a0(allergic conjunctivitus)"],
        "reasoning": "Based on NHS Inform guidelines for Food allergy.",
        "treatment": ["tingling or itching in the mouth", "a raised, itchy red rash (urticarial) \u2013 in some cases, the skin can turn red and itchy, but without a raised rash", "swelling of the face, mouth\u00a0(angioedema), throat\u00a0or other areas of the body", "difficulty swallowing", "wheezing or shortness of breath", "feeling\u00a0dizzy and lightheaded", "feeling sick (nausea) or vomiting", "abdominal pain or\u00a0diarrhoea"]
    },
    "food_poisoning": {
        "diagnosis": "Food poisoning",
        "tier": "GREEN",
        "symptoms": ["feeling sick (nausea)", "being sick (vomiting)", "diarrhoea, which may contain blood or mucus", "stomach cramps and abdominal pain", "a lack of energy and weakness", "loss of appetite", "a high temperature of 38c or above (fever)", "aching muscles", "chills"],
        "reasoning": "Based on NHS Inform guidelines for Food poisoning.",
        "treatment": []
    },
    "fragility_fracture_of_the_hip": {
        "diagnosis": "Fragility fracture of the hip",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Fragility fracture of the hip.",
        "treatment": []
    },
    "frozen_shoulder": {
        "diagnosis": "Frozen shoulder",
        "tier": "GREEN",
        "symptoms": ["bathing", "dressing", "driving", "sleeping comfortably"],
        "reasoning": "Based on NHS Inform guidelines for Frozen shoulder.",
        "treatment": ["Arthritis UK: shoulder pain", "Chartered Society of Physiotherapy", "The Pain Toolkit"]
    },
    "functional_neurological_disorder": {
        "diagnosis": "Functional neurological disorder",
        "tier": "GREEN",
        "symptoms": ["problems walking", "heaviness down one side", "dropping things", "feeling like a limb isn\u2019t part of you"],
        "reasoning": "Based on NHS Inform guidelines for Functional neurological disorder.",
        "treatment": ["Neurosymptoms FND Guide", "My FND", "FND Action", "Dissociative Seizures: Right Decisions"]
    },
    "fungal_nail_infection": {
        "diagnosis": "Fungal nail infection",
        "tier": "YELLOW",
        "symptoms": ["white or yellow", "easy to break", "thick"],
        "reasoning": "Based on NHS Inform guidelines for Fungal nail infection.",
        "treatment": ["headaches", "an itchy rash", "stomach ache", "feeling sick", "diarrhoea"]
    },
    "gallbladder_cancer": {
        "diagnosis": "Gallbladder cancer",
        "tier": "GREEN",
        "symptoms": ["sickness", "high temperature", "weight loss", "tummy pain"],
        "reasoning": "Based on NHS Inform guidelines for Gallbladder cancer.",
        "treatment": ["ask your GP or someone from your cancer team for advice about support in your area", "find local cancer support services"]
    },
    "gallstones": {
        "diagnosis": "Gallstones",
        "tier": "GREEN",
        "symptoms": ["in the centre of your abdomen (tummy)", "just under the ribs on your right-hand side \u2013\u00a0it may spread from here\u00a0to your side or shoulder blade"],
        "reasoning": "Based on NHS Inform guidelines for Gallstones.",
        "treatment": []
    },
    "ganglion_cyst": {
        "diagnosis": "Ganglion cyst",
        "tier": "GREEN",
        "symptoms": ["continues to increase in size", "restricts function", "becomes hard", "becomes irregular in shape", "becomes painful"],
        "reasoning": "Based on NHS Inform guidelines for Ganglion cyst.",
        "treatment": []
    },
    "ganglion_cysts_in_children_and_young_people": {
        "diagnosis": "Ganglion cysts in children and young people",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Ganglion cysts in children and young people.",
        "treatment": []
    },
    "gastroenteritis": {
        "diagnosis": "Gastroenteritis",
        "tier": "GREEN",
        "symptoms": ["sudden, watery\u00a0diarrhoea", "feeling sick", "vomiting, which can be projectile", "a mild fever"],
        "reasoning": "Based on NHS Inform guidelines for Gastroenteritis.",
        "treatment": []
    },
    "gastro_oesophageal_reflux_disease_gord": {
        "diagnosis": "Gastro-oesophageal reflux disease (GORD)",
        "tier": "GREEN",
        "symptoms": ["heartburn (an uncomfortable burning sensation in the chest that often occurs after eating)", "acid reflux (where stomach acid comes back up into your mouth and causes an unpleasant, sour\u00a0taste)", "oesophagitis\u00a0(a sore, inflamed oesophagus)", "bad breath", "bloating and belching", "feeling or being sick", "pain when swallowing and/or difficulty swallowing"],
        "reasoning": "Based on NHS Inform guidelines for Gastro-oesophageal reflux disease (GORD).",
        "treatment": ["self-help measures \u2013 this includes eating smaller but more frequent meals, avoiding any foods or drinks that trigger your symptoms, raising the head of your bed, and keeping to a healthy weight", "over-the-counter medicines \u2013 ask your pharmacist to recommend an\u00a0antacid\u00a0or an\u00a0alginate", "stronger prescription medicines \u2013 including\u00a0proton-pump inhibitors (PPIs)\u00a0and H2-receptor antagonists (H2RAs)"]
    },
    "generalised_anxiety_disorder_gad": {
        "diagnosis": "Generalised anxiety disorder (GAD)",
        "tier": "GREEN",
        "symptoms": ["restlessness", "a sense of dread", "feeling constantly \u201con edge\u201d", "difficulty concentrating", "irritability", "dizziness", "tiredness", "a noticeably strong, fast or irregular heartbeat (palpitations)", "muscle aches and tension", "trembling or shaking"],
        "reasoning": "Based on NHS Inform guidelines for Generalised anxiety disorder (GAD).",
        "treatment": ["talking therapies \u2013 like cognitive behavioural therapy (CBT)", "medication \u2013 like a type of antidepressant called selective serotonin reuptake inhibitors (SSRIs)"]
    },
    "genital_herpes": {
        "diagnosis": "Genital herpes",
        "tier": "GREEN",
        "symptoms": ["spots or red bumps around the genital area", "pain inside the vagina, head of penis or anus", "vaginal discharge", "pain peeing or being unable to pee", "fever", "flu-like symptoms, backache, headache and a temperature", "mild swelling of the lymph glands in the groin, armpits and neck"],
        "reasoning": "Based on NHS Inform guidelines for Genital herpes.",
        "treatment": ["from skin to skin contact with the infected area (including vaginal, anal and oral sex)", "when there are no visible sores or blisters", "if a cold sore touches your genitals or face", "kissing (if the person has a cold sore on their face)", "by sharing sex toys with someone who has herpes"]
    },
    "managing_genital_symptoms": {
        "diagnosis": "Managing genital symptoms",
        "tier": "GREEN",
        "symptoms": ["use a soap substitute (emollient) to add moisture instead of soap \u2013 these are available from pharmacies", "use non-soap bath additives such as unfragranced bath oil instead of bubble bath", "treat athlete\u2019s foot straight away to prevent it spreading to your genital area when you pull your underwear on", "if you have a penis with a foreskin, always remember to pull back the foreskin gently but fully when washing and dry gently with a towel before replacing the foreskin"],
        "reasoning": "Based on NHS Inform guidelines for Managing genital symptoms.",
        "treatment": []
    },
    "genital_warts": {
        "diagnosis": "Genital warts",
        "tier": "GREEN",
        "symptoms": ["around the vagina and on the penis", "around the anus", "on the skin between the genitals and the anus"],
        "reasoning": "Based on NHS Inform guidelines for Genital warts.",
        "treatment": ["cream or liquid", "freezing", "surgery"]
    },
    "glandular_fever": {
        "diagnosis": "Glandular fever",
        "tier": "GREEN",
        "symptoms": ["a high temperature (fever)", "a very\u00a0sore throat", "swollen glands\u00a0in the neck", "fatigue (extreme tiredness)", "headache"],
        "reasoning": "Based on NHS Inform guidelines for Glandular fever.",
        "treatment": ["drink plenty of fluids", "take over-the-counter painkillers, like\u00a0paracetamol\u00a0or\u00a0ibuprofen", "get plenty of rest"]
    },
    "golfers_elbow": {
        "diagnosis": "Golfers elbow",
        "tier": "GREEN",
        "symptoms": ["difficulty with gripping.", "difficulty with twisting movements such as opening jars.", "restriction in movement at the elbow.", "tenderness when touching the area."],
        "reasoning": "Based on NHS Inform guidelines for Golfers elbow.",
        "treatment": ["changing how you grip or lift an object.", "reducing the weight you are carrying.", "taking regular breaks while doing aggravating activities."]
    },
    "gonorrhoea": {
        "diagnosis": "Gonorrhoea",
        "tier": "GREEN",
        "symptoms": ["green or yellow fluid coming out of the penis", "pain or a burning sensation when peeing", "discomfort and swelling of the testicles", "increased discharge from the vagina", "pain in the lower tummy, particularly during sex", "bleeding in between periods or after sex"],
        "reasoning": "Based on NHS Inform guidelines for Gonorrhoea.",
        "treatment": ["are pregnant", "think you might be pregnant", "are breastfeeding"]
    },
    "gout": {
        "diagnosis": "Gout",
        "tier": "GREEN",
        "symptoms": ["toes, especially the big toe", "ankles", "knees", "fingers"],
        "reasoning": "Based on NHS Inform guidelines for Gout.",
        "treatment": ["relieve symptoms during a flare", "prevent further flares by taking urate lowering medicines like allopurinol"]
    },
    "greater_trochanteric_pain_syndrome": {
        "diagnosis": "Greater trochanteric pain syndrome",
        "tier": "GREEN",
        "symptoms": ["pain in the hip, thigh or buttock area", "worse pain when lying on your side or with direct pressure", "pain increasing with exercise like periods of walking, standing or running", "tenderness to touch", "pain sitting with your legs crossed", "pain when standing on the affected leg (sometimes called hanging on the hip)", "pain when climbing stairs", "pain when lifting legs in or out of a car or bed"],
        "reasoning": "Based on NHS Inform guidelines for Greater trochanteric pain syndrome.",
        "treatment": []
    },
    "gum_disease": {
        "diagnosis": "Gum disease",
        "tier": "GREEN",
        "symptoms": ["red and swollen gums", "bleeding gums after brushing your teeth or after using interdental brushes or floss"],
        "reasoning": "Based on NHS Inform guidelines for Gum disease.",
        "treatment": []
    },
    "haemorrhoids_piles": {
        "diagnosis": "Haemorrhoids (piles)",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Haemorrhoids (piles).",
        "treatment": ["avoid straining to pass stools, because it may make your haemorrhoids worse", "use\u00a0moist toilet paper,\u00a0rather than dry toilet paper, or baby wipes\u00a0to clean your bottom\u00a0after passing a stool", "pat the area\u00a0around your bottom, rather than rubbing it"]
    },
    "hand_foot_and_mouth_disease": {
        "diagnosis": "Hand, foot and mouth disease",
        "tier": "GREEN",
        "symptoms": ["a high temperature (fever)", "feeling unwell", "loss of appetite", "coughing", "abdominal (tummy) pain", "a sore throat and mouth"],
        "reasoning": "Based on NHS Inform guidelines for Hand, foot and mouth disease.",
        "treatment": ["rest at home", "drink lots of water", "eat soft foods like yoghurt or soup if swallowing is uncomfortable", "take paracetamol or ibuprofen to ease a sore throat or fever", "use mouth gels, rinses or sprays for mouth ulcers"]
    },
    "hay_fever": {
        "diagnosis": "Hay fever",
        "tier": "GREEN",
        "symptoms": ["frequent sneezing", "runny or blocked nose", "itchy, red or watery eyes (allergic conjunctivitis)", "an itchy throat, mouth, nose and ears", "cough \u2013 this is caused by postnasal drip (mucus dripping down the throat from the back of the nose)"],
        "reasoning": "Based on NHS Inform guidelines for Hay fever.",
        "treatment": ["frequent sneezing", "runny or blocked nose", "itchy, red or watery eyes (allergic conjunctivitis)", "an itchy throat, mouth, nose and ears", "cough \u2013 this is caused by postnasal drip (mucus dripping down the throat from the back of the nose)"]
    },
    "head_and_neck_cancer": {
        "diagnosis": "Head and neck cancer",
        "tier": "GREEN",
        "symptoms": ["mouth which includes the tongue, palate, gums and lips", "throat (the pharynx) which is divided into the nasopharynx, oropharynx and hypopharynx", "nose and sinuses (air-filled spaces in the bones of the face)", "salivary glands which make saliva", "middle ear which contains the ear drum"],
        "reasoning": "Based on NHS Inform guidelines for Head and neck cancer.",
        "treatment": ["ongoing side effects or symptoms that are not improving", "any new symptoms that do not get better within 2 weeks."]
    },
    "head_lice_and_nits": {
        "diagnosis": "Head lice and nits",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Head lice and nits.",
        "treatment": []
    },
    "headaches": {
        "diagnosis": "Headaches",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Headaches.",
        "treatment": ["advice about headache", "treatments to help relieve headache"]
    },
    "hearing_loss": {
        "diagnosis": "Hearing loss",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Hearing loss.",
        "treatment": ["digital hearing aids \u2013 which are available through the NHS", "bone anchored implants \u2013 suitable for people who are unable to use hearing aids and for some levels of sensorineural hearing loss", "middle ear implants \u2013 suitable for some people who are unable to use hearing aids", "cochlear implants \u2013 for people who find hearing aids aren\u2019t powerful enough", "lip reading and/or sign language \u2013 such as British Sign Language (BSL)"]
    },
    "heart_attack": {
        "diagnosis": "Heart attack",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Heart attack.",
        "treatment": ["anti-emetics \u2013 to stop sickness and nausea", "antiplatelet therapy \u2013 medication that thins the blood and gets rid of blood clots", "coronary angioplasty \u2013 a procedure to widen coronary arteries that are blocked or narrow", "oxygen therapy \u2013 to help with your breathing and oxygen levels", "pain-relieving drugs \u2013 like morphine", "reperfusion treatment \u2013 to help restore blood flow and maintain the heart\u2019s pumping action", "thrombolysis \u2013 a \u2018clot-busting drug\u2019 to help restore blood flow to your heart"]
    },
    "heart_block": {
        "diagnosis": "Heart block",
        "tier": "GREEN",
        "symptoms": ["dizziness", "light-headedness", "fainting or collapse", "chest pain \u2013 which may be worse during physical activity like climbing the stairs", "breathlessness", "getting tired easily when doing physical activity"],
        "reasoning": "Based on NHS Inform guidelines for Heart block.",
        "treatment": ["ageing of the electrical pathways in your heart", "other heart conditions like a heart attack", "some prescription medicines", "heart surgery", "other conditions like Lyme disease"]
    },
    "heart_disease": {
        "diagnosis": "Heart disease",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Heart disease.",
        "treatment": []
    },
    "heart_failure": {
        "diagnosis": "Heart failure",
        "tier": "GREEN",
        "symptoms": ["breathlessness", "a persistent cough", "tiredness or fatigue that occurs even at rest and gets worse with movement", "swelling in the legs or ankles"],
        "reasoning": "Based on NHS Inform guidelines for Heart failure.",
        "treatment": []
    },
    "heart_palpitations": {
        "diagnosis": "Heart palpitations",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Heart palpitations.",
        "treatment": []
    },
    "heatstroke_and_heat_illness": {
        "diagnosis": "Heatstroke and heat illness",
        "tier": "GREEN",
        "symptoms": ["tiredness", "weakness", "feeling faint", "headache", "muscle cramps", "feeling or being sick", "heavy sweating", "feeling very thirsty", "heat rash"],
        "reasoning": "Based on NHS Inform guidelines for Heatstroke and heat illness.",
        "treatment": ["older people", "babies", "young children", "people with long-term health conditions like diabetes or heart problems"]
    },
    "hepatitis_a": {
        "diagnosis": "Hepatitis A",
        "tier": "GREEN",
        "symptoms": ["feeling tired and generally unwell", "joint and muscle pain", "a high temperature (fever)", "loss of appetite", "feeling or being sick", "pain in the upper-right part of your tummy", "a headache, sore throat and cough", "constipation or diarrhoea", "a raised, itchy rash (hives)", "yellowing of the skin and eyes (jaundice)"],
        "reasoning": "Based on NHS Inform guidelines for Hepatitis A.",
        "treatment": ["get plenty of rest", "take painkillers such as paracetamol or ibuprofen for any aches and pains \u2013 ask your GP for advice as you may need to take lower doses than normal or avoid certain medications until you\u2019ve recovered", "have a cool, airy environment", "wear loose clothing", "eat smaller, lighter meals to help reduce feeling sick and vomiting", "wash your hands with soap and water regularly", "wash soiled laundry separately on a hot cycle", "clean the toilet, flush handles and taps more often than usual"]
    },
    "hepatitis_b": {
        "diagnosis": "Hepatitis B",
        "tier": "GREEN",
        "symptoms": ["tiredness", "a high temperature (fever) of 38\u00b0c (100.4\u00b0f) or above", "general aches and pains", "loss of appetite", "feeling and being sick", "diarrhoea", "abdominal pain", "yellowing of the skin and eyes (jaundice)"],
        "reasoning": "Based on NHS Inform guidelines for Hepatitis B.",
        "treatment": ["long-term or lifelong treatment", "regular checks for any further liver problems"]
    },
    "hepatitis_c": {
        "diagnosis": "Hepatitis C",
        "tier": "GREEN",
        "symptoms": ["a high temperature (fever) of 38\u00b0c (100.4\u00b0f) or above", "tiredness", "loss of appetite", "abdominal pain", "feeling and being sick", "yellowing of the skin and eyes (jaundice)"],
        "reasoning": "Based on NHS Inform guidelines for Hepatitis C.",
        "treatment": ["eat a healthy and balanced diet", "exercise regularly", "speak to your doctor if you\u2019re thinking of having a baby"]
    },
    "hiatus_hernia": {
        "diagnosis": "Hiatus hernia",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Hiatus hernia.",
        "treatment": []
    },
    "high_blood_pressure_hypertension": {
        "diagnosis": "High blood pressure (hypertension)",
        "tier": "GREEN",
        "symptoms": ["headaches", "blurred or double vision", "regular nosebleeds", "shortness of breath"],
        "reasoning": "Based on NHS Inform guidelines for High blood pressure (hypertension).",
        "treatment": ["angiotensin-converting enzyme (ACE) inhibitors \u2013 like ramipril", "calcium channel blockers \u2013 like amlodipine", "thiazide diuretics \u2013 like bendroflumethazide", "alpha-blockers \u2013 like doxazosin", "beta-blockers \u2013 like atenolol"]
    },
    "high_cholesterol": {
        "diagnosis": "High cholesterol",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for High cholesterol.",
        "treatment": []
    },
    "hip_problems_in_children_and_young_people": {
        "diagnosis": "Hip problems in children and young people",
        "tier": "GREEN",
        "symptoms": ["pain", "a limp that\u2019s newly started", "stiffness", "weakness", "a click you can hear", "your child feeling their hip click"],
        "reasoning": "Based on NHS Inform guidelines for Hip problems in children and young people.",
        "treatment": ["Perthes' disease", "Slipped upper femoral epiphysis (SUFE) in children and young people", "Snapping hip in children and young people", "Traction apophysitis of the hip in children and young people"]
    },
    "hiv": {
        "diagnosis": "HIV",
        "tier": "GREEN",
        "symptoms": ["fever (high temperature)", "sore throat", "body rash"],
        "reasoning": "Based on NHS Inform guidelines for HIV.",
        "treatment": ["sharing sex toys that aren\u2019t washed or covered with a new condom each time they\u2019re used", "sharing needles, syringes and other injecting equipment", "from mother to baby before or during birth when the mother isn\u2019t taking HIV medication", "from mother to baby by breastfeeding when the mother isn\u2019t taking HIV medication", "blood transfusion (outside of the UK)"]
    },
    "hives": {
        "diagnosis": "Hives",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Hives.",
        "treatment": ["angioedema\u00a0\u2013 a deeper swelling of tissues", "psychological and emotional problems like\u00a0stress\u00a0and\u00a0anxiety", "anaphylaxis\u00a0\u2013 a severe allergic reaction that should be treated as a serious medical emergency"]
    },
    "hodgkin_lymphoma": {
        "diagnosis": "Hodgkin lymphoma",
        "tier": "GREEN",
        "symptoms": ["hodgkin", "non-hodgkin lymphoma"],
        "reasoning": "Based on NHS Inform guidelines for Hodgkin lymphoma.",
        "treatment": ["Chemotherapy with different drugs that are usually stronger than you had before.", "Radiotherapy to treat a new area of lymphoma in the body or an area that is causing symptoms.", "Targeted and immunotherapy drugs are often used if the lymphoma comes back.", "High dose chemotherapy followed by autologous stem cell transplants (using your own stem cells). You may be offered this treatment after having further chemotherapy to get the lymphoma back into remission.", "A donor stem cell (allogeneic) transplant may be offered if the lymphoma does not respond well enough to other treatments."]
    },
    "huntington_s_disease": {
        "diagnosis": "Huntington’s disease",
        "tier": "GREEN",
        "symptoms": ["a lack of emotions and not recognising the needs of others", "periods of aggression, excitement, depression, antisocial behaviour and anger", "apathy \u2013 causing a person to appear lazy or have a lack of interest in hygiene and self care", "difficulty concentrating on more than one task and handling complex situations", "irritability and impulsiveness"],
        "reasoning": "Based on NHS Inform guidelines for Huntington’s disease.",
        "treatment": []
    },
    "hydrocephalus": {
        "diagnosis": "Hydrocephalus",
        "tier": "GREEN",
        "symptoms": ["headache", "nausea and vomiting (feeling and being sick)", "blurred vision", "drowsiness", "difficulty walking"],
        "reasoning": "Based on NHS Inform guidelines for Hydrocephalus.",
        "treatment": ["redness and tenderness along the line of the shunt or the wounds", "a high temperature", "headache", "vomiting", "neck stiffness", "tummy pain caused by the shunt draining into your tummy", "irritability or sleepiness in babies"]
    },
    "hyperglycaemia_high_blood_sugar": {
        "diagnosis": "Hyperglycaemia (high blood sugar)",
        "tier": "YELLOW",
        "symptoms": ["increased\u00a0thirst and a\u00a0dry mouth", "needing to\u00a0pee frequently", "tiredness", "blurred vision", "unintentional\u00a0weight loss", "recurrent infections, such as thrush,\u00a0bladder infections (cystitis) and skin infections"],
        "reasoning": "Based on NHS Inform guidelines for Hyperglycaemia (high blood sugar).",
        "treatment": []
    },
    "hypoglycaemia_low_blood_sugar": {
        "diagnosis": "Hypoglycaemia (low blood sugar)",
        "tier": "GREEN",
        "symptoms": ["a glucagon injection kit isn\u2019t available", "there\u2019s nobody trained to give the injection", "the injection is ineffective after 10 minutes"],
        "reasoning": "Based on NHS Inform guidelines for Hypoglycaemia (low blood sugar).",
        "treatment": ["keeping something sugary by your bedside", "having a snack before bedtime, such as biscuits and milk", "checking your blood glucose levels between 3am and 4am, when\u00a0hypoglycaemia is most likely to occur"]
    },
    "hypothermia_low_body_temperature": {
        "diagnosis": "Hypothermia (low body temperature)",
        "tier": "GREEN",
        "symptoms": ["being unsteady on your feet", "slurred speech", "poor co-ordination", "confusion", "not responding as normal", "pale, cold and dry skin", "loss of consciousness", "slow or shallow breathing"],
        "reasoning": "Based on NHS Inform guidelines for Hypothermia (low body temperature).",
        "treatment": ["don\u2019t wear enough warm clothing in cold weather", "live in a cold house", "stay out in the cold too long", "have been in cold water", "have damp or wet clothes and get cold"]
    },
    "idiopathic_pulmonary_fibrosis": {
        "diagnosis": "Idiopathic pulmonary fibrosis",
        "tier": "GREEN",
        "symptoms": ["shortness of breath", "a persistent dry cough", "tiredness", "loss of appetite and weight loss", "rounded and swollen fingertips (clubbed fingers)"],
        "reasoning": "Based on NHS Inform guidelines for Idiopathic pulmonary fibrosis.",
        "treatment": ["lifestyle changes \u2013 such as stopping smoking, eating healthily and exercising regularly", "medication such as pirfenidone and nintedanib to reduce the rate at which scarring worsens \u2013 often your specialist team will monitor you, your breathing tests and your scan to see if your condition is progressing over time before starting treatment", "breathing oxygen through a mask \u2013 if your oxygen levels are low when you\u2019re resting, your specialist team may recommend wearing oxygen all the time, but if they are only low when you move around around, you may only need this when you are out and about", "pulmonary rehabilitation \u2013 exercises and advice to help you breathe more easily", "a lung transplant \u2013 this is suitable in a few cases, although donor lungs are rare and patients have to be otherwise very fit to benefit from a transplant"]
    },
    "if_your_child_has_cold_or_flu_symptoms": {
        "diagnosis": "If your child has cold or flu symptoms",
        "tier": "GREEN",
        "symptoms": ["fever of 37.5\u00b0c or above", "breathlessness", "rapid breathing", "cough", "not taking usual feeds", "not having\u00a0their usual wet or dirty nappies"],
        "reasoning": "Based on NHS Inform guidelines for If your child has cold or flu symptoms.",
        "treatment": ["use infant paracetamol or ibuprofen", "only use over the counter remedies recommended by your pharmacist", "encourage your child to drink more fluids"]
    },
    "impetigo": {
        "diagnosis": "Impetigo",
        "tier": "GREEN",
        "symptoms": ["non-bullous impetigo \u2013 the most common type", "bullous impetigo"],
        "reasoning": "Based on NHS Inform guidelines for Impetigo.",
        "treatment": ["through a break in otherwise healthy skin\u00a0\u2013 such as a cut,\u00a0insect bite or other injury\u00a0\u2013 this is known as primary impetigo", "through skin damaged by another underlying skin condition, such as head lice, scabies or eczema \u2013 this is known as secondary impetigo"]
    },
    "indigestion": {
        "diagnosis": "Indigestion",
        "tier": "GREEN",
        "symptoms": ["feeling uncomfortably full or heavy", "belching or\u00a0flatulence(passing wind)", "bringing\u00a0food or fluid\u00a0back up from your stomach (reflux)", "bloating", "feeling sick (nausea)", "vomiting"],
        "reasoning": "Based on NHS Inform guidelines for Indigestion.",
        "treatment": ["you are 55 years old or over", "you have lost a lot of weight without meaning to", "you have increasing\u00a0difficulty swallowing (dysphagia)", "you have persistent vomiting", "you have\u00a0iron deficiency anaemia", "you have a lump in your stomach", "you have blood in your vomit or\u00a0blood in your stools"]
    },
    "ingrown_toenail": {
        "diagnosis": "Ingrown toenail",
        "tier": "GREEN",
        "symptoms": ["cause pus to come out of the area", "make you to feel hot and shivery"],
        "reasoning": "Based on NHS Inform guidelines for Ingrown toenail.",
        "treatment": ["soak your foot in warm, salty water \u2013 this helps to soften the skin around the toe and reduces the chance of infection", "dry your feet well after washing them", "wear wide, comfortable shoes or sandals", "take paracetamol or ibuprofen to reduce pain"]
    },
    "infertility": {
        "diagnosis": "Infertility",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Infertility.",
        "treatment": ["have a BMI of between 19 and 25 \u2013 being underweight or overweight reduces fertility and can also lead to complications in pregnancy", "quit smoking if you smoke \u2013 smoking reduces semen quality and can cause issues in pregnancy", "avoid passive smoking", "reduce stress where possible \u2013 stress can affect your relationships and sex drive, and in severe cases can affect ovulation and sperm production"]
    },
    "inflammatory_bowel_disease_ibd": {
        "diagnosis": "Inflammatory bowel disease (IBD)",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Inflammatory bowel disease (IBD).",
        "treatment": []
    },
    "inherited_heart_conditions": {
        "diagnosis": "Inherited heart conditions",
        "tier": "GREEN",
        "symptoms": ["dizzy spells", "blackouts, faints or fits (seizures)", "palpitations", "breathlessness", "chest pain"],
        "reasoning": "Based on NHS Inform guidelines for Inherited heart conditions.",
        "treatment": ["changes to your lifestyle", "medication", "pacemakers\u00a0or implantable cardioverter defibrillators (ICDs)", "heart transplantation (in rare cases)"]
    },
    "insomnia": {
        "diagnosis": "Insomnia",
        "tier": "GREEN",
        "symptoms": ["find it hard to fall asleep", "lie awake at night", "wake up several times during the night", "wake up early in the morning and not be able to get back to sleep", "not feel refreshed when you get up", "feel tired and irritable during the day", "have difficulty concentrating because you\u2019re tired"],
        "reasoning": "Based on NHS Inform guidelines for Insomnia.",
        "treatment": ["symptoms of a sleep problem", "causes of sleep problems", "improving your sleep", "calming a busy mind"]
    },
    "intoeing_pigeon_toe_in_children_and_young_people": {
        "diagnosis": "Intoeing (pigeon toe) in children and young people",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Intoeing (pigeon toe) in children and young people.",
        "treatment": []
    },
    "iron_deficiency_anaemia": {
        "diagnosis": "Iron deficiency anaemia",
        "tier": "GREEN",
        "symptoms": ["tiredness and lack of energy (lethargy)", "shortness of breath", "noticeable heartbeats\u00a0(heart palpitations)", "a pale complexion"],
        "reasoning": "Based on NHS Inform guidelines for Iron deficiency anaemia.",
        "treatment": ["be born prematurely\u00a0\u2013\u00a0before the 37th week of pregnancy", "have a low birth weight", "have problems with\u00a0iron levels themselves", "do less well in mental ability tests"]
    },
    "irritable_bowel_syndrome_ibs": {
        "diagnosis": "Irritable bowel syndrome (IBS)",
        "tier": "GREEN",
        "symptoms": ["abdominal (stomach) pain\u00a0and cramping, which may be relieved by moving your bowels", "a change in your bowel habits \u2013 such as\u00a0diarrhoea,\u00a0constipation\u00a0or sometimes both", "bloating and swelling of your stomach", "excessive wind (flatulence)", "occasionally experiencing an urgent need to move your bowels"],
        "reasoning": "Based on NHS Inform guidelines for Irritable bowel syndrome (IBS).",
        "treatment": []
    },
    "itchy_skin": {
        "diagnosis": "Itchy skin",
        "tier": "GREEN",
        "symptoms": ["generalised \u2013 it affects the whole body", "localised \u2013 it only affects a specific area"],
        "reasoning": "Based on NHS Inform guidelines for Itchy skin.",
        "treatment": ["a moisturiser or emollient \u2013 for dry or flaky skin", "a cream with menthol \u2013 to cool the skin and prevent itching", "a mild steroid cream \u2013 for inflamed areas", "antihistamines \u2013 for an allergic reaction (these may not be suitable for everyone)"]
    },
    "itchy_bottom": {
        "diagnosis": "Itchy bottom",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Itchy bottom.",
        "treatment": []
    },
    "joint_hypermobility": {
        "diagnosis": "Joint hypermobility",
        "tier": "GREEN",
        "symptoms": ["pain and stiffness in the joints and muscles", "clicking joints", "joints that dislocate (come out of the correct position) easily", "fatigue (extreme tiredness)", "recurrent injuries \u2013 like sprains", "digestive problems \u2013 like constipation and irritable bowel syndrome (ibs)", "dizziness and fainting", "thin or stretchy skin"],
        "reasoning": "Based on NHS Inform guidelines for Joint hypermobility.",
        "treatment": []
    },
    "kaposi_s_sarcoma": {
        "diagnosis": "Kaposi’s sarcoma",
        "tier": "GREEN",
        "symptoms": ["skin", "lining of the mouth."],
        "reasoning": "Based on NHS Inform guidelines for Kaposi’s sarcoma.",
        "treatment": ["A drug called vinorelbine, which you take as capsules.", "Pegylated liposomal doxorubicin, usually every 3 weeks. Liposomal drugs have fewer side effects than standard chemotherapy. This means treatment can be given for longer.", "A drug called paclitaxel every 2 to 3 weeks."]
    },
    "kidney_cancer": {
        "diagnosis": "Kidney cancer",
        "tier": "GREEN",
        "symptoms": ["your general health", "how well your kidneys are working"],
        "reasoning": "Based on NHS Inform guidelines for Kidney cancer.",
        "treatment": ["If you have a genetic condition called von Hippel-Lindau disease (VHL), you may have a drug called belzutifan instead of surgery. This can control a small early kidney cancer.", "After surgery to remove a locally advanced kidney cancer, you may have a drug called pembrolizumab. This helps reduce the risk of the cancer coming back. Sometimes other drugs are used before or after surgery as part of a clinical trial.", "If you have advanced kidney cancer, your main treatment usually involves targeted therapy and immunotherapy drugs. You may have a combination of drugs or 1 drug on its own. You can find out more in our information about treatments for kidney cancer."]
    },
    "kidney_infection": {
        "diagnosis": "Kidney infection",
        "tier": "YELLOW",
        "symptoms": ["pain and discomfort in your side, lower back\u00a0or around your genitals", "high temperature (it may reach 39.5c or 103.1f)", "shivering or chills", "feeling very weak or tired", "loss of appetite", "feeling sick or being sick", "diarrhoea"],
        "reasoning": "Based on NHS Inform guidelines for Kidney infection.",
        "treatment": ["you\u2019re severely dehydrated", "you\u2019re unable to swallow or keep down any fluids or medications", "you have additional symptoms that suggest you may have\u00a0blood poisoning, such as a rapid heartbeat and losing consciousness", "you\u2019re pregnant and you also have a high temperature", "you\u2019re particularly frail and\u00a0your general health is poor", "your symptoms fail to improve within 24 hours of starting treatment with antibiotics", "you have a weakened immune system", "you have a foreign body inside your urinary tract, such as a kidney stone or a urinary catheter"]
    },
    "kidney_stones": {
        "diagnosis": "Kidney stones",
        "tier": "GREEN",
        "symptoms": ["ureter \u2013 the tube connecting the kidney to the bladder", "urethra \u2013 the tube urine passes through on its way out of the body"],
        "reasoning": "Based on NHS Inform guidelines for Kidney stones.",
        "treatment": ["you\u2019re at an increased risk of your kidneys failing\u00a0(for example, because you only have one kidney)", "your symptoms don\u2019t improve within an hour of being given painkillers or anti-sickness medication", "you\u2019re\u00a0dehydrated and vomiting too much to keep fluids down", "you\u2019re pregnant", "you\u2019re over 60 years of age"]
    },
    "labyrinthitis": {
        "diagnosis": "Labyrinthitis",
        "tier": "GREEN",
        "symptoms": ["vertigo (dizziness) \u2013 the sensation that you, or the environment around you, is moving", "hearing loss (from mild to total loss of hearing)", "a feeling of pressure inside your ear(s)", "ringing or humming in your ear(s) (tinnitus)", "feeling sick (nausea) or being sick", "mild headaches"],
        "reasoning": "Based on NHS Inform guidelines for Labyrinthitis.",
        "treatment": ["prochlorperazine \u2013 can help with dizziness and sickness", "antiemetic \u2013 can help if you\u2019re feeling sick and vomiting", "corticosteroids \u2013 can help by reducing inflammation"]
    },
    "lactose_intolerance": {
        "diagnosis": "Lactose intolerance",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Lactose intolerance.",
        "treatment": []
    },
    "laryngeal_larynx_cancer": {
        "diagnosis": "Laryngeal (larynx) cancer",
        "tier": "GREEN",
        "symptoms": ["sarcoma \u2013 cancer of the connective tissues in the larynx.", "lymphoma \u2013 cancer of the lymphatic tissue in the larynx.", "adenocarcinoma \u2013 cancer that starts in the glandular (adeno) cells of the larynx.", "neuroendocrine carcinoma \u2013 cancer that develops from cells similar to nerve (neuro) cells that make hormones (endocrine). hormones control how different organs in the body work."],
        "reasoning": "Based on NHS Inform guidelines for Laryngeal (larynx) cancer.",
        "treatment": ["call the Macmillan Support Line on 0808 808 00 00", "chat to Macmillan specialists online", "visit the Macmillan laryngeal (larynx) cancer forum to share your experience, talk with people who have been affected by laryngeal cancer, and ask an expert your questions"]
    },
    "laryngitis": {
        "diagnosis": "Laryngitis",
        "tier": "GREEN",
        "symptoms": ["hoarseness", "difficulty speaking", "sore throat", "mild fever", "irritating cough", "a constant need to clear your throat"],
        "reasoning": "Based on NHS Inform guidelines for Laryngitis.",
        "treatment": []
    },
    "late_miscarriage": {
        "diagnosis": "Late miscarriage",
        "tier": "GREEN",
        "symptoms": ["vaginal bleeding", "strong cramping pain", "a gush or trickle of liquid from your vagina", "your baby\u2019s movements changing, like slowing down or stopping"],
        "reasoning": "Based on NHS Inform guidelines for Late miscarriage.",
        "treatment": ["applying ice packs (or a bag of frozen peas) covered in a light cloth to your breasts", "wearing a well-fitting bra", "using pain relief like ibuprofen or paracetamol", "expressing small amounts by hand (just enough to ease the pain, otherwise you\u2019ll encourage the production of more milk)", "taking a warm shower, which may encourage your milk to leak naturally."]
    },
    "leg_cramps": {
        "diagnosis": "Leg cramps",
        "tier": "GREEN",
        "symptoms": ["leg cramps last longer than 10 minutes and don\u2019t get better when you start to move", "leg cramps develop after you\u2019ve come into contact with a substance like mercury, lead or dirt that gets in a cut"],
        "reasoning": "Based on NHS Inform guidelines for Leg cramps.",
        "treatment": []
    },
    "legionnaires_disease": {
        "diagnosis": "Legionnaires’ disease",
        "tier": "GREEN",
        "symptoms": ["a cough", "shortness of breath", "chest pain or discomfort, particularly when breathing or coughing", "a high temperature (fever)", "flu-like symptoms"],
        "reasoning": "Based on NHS Inform guidelines for Legionnaires’ disease.",
        "treatment": ["antibiotics given directly into a vein (intravenous)", "oxygen through a face mask or tubes in your nose", "a machine to help you breathe"]
    },
    "limb_girdle_muscular_dystrophy": {
        "diagnosis": "Limb girdle muscular dystrophy",
        "tier": "GREEN",
        "symptoms": ["frequent falls", "difficulty running", "difficulty climbing stairs", "difficulty getting up from the floor", "problems raising your arms above your head", "difficulty lifting objects"],
        "reasoning": "Based on NHS Inform guidelines for Limb girdle muscular dystrophy.",
        "treatment": ["have poor mobility", "spend a lot of time sitting down"]
    },
    "lipoedema": {
        "diagnosis": "Lipoedema",
        "tier": "GREEN",
        "symptoms": ["enlargement of your legs, and in some cases arms, but usually not your feet or hands", "pain, discomfort, heaviness or tenderness affected areas", "affected areas of your body can bruise easily, sometimes for no obvious reason", "dimpled legs with a lumpy texture, fat may bulge at the knees", "swelling that gets worse in the afternoon, evening, after activity or in hot weather", "spider veins or\u00a0varicose veins\u00a0on your legs", "difficulty walking due to changes in your leg shape, heavy legs, or \u2018flat-feet\u2019"],
        "reasoning": "Based on NHS Inform guidelines for Lipoedema.",
        "treatment": ["maintain a healthy weight by eating a balanced diet \u2013 this can also reduce your chances of developing other health conditions such as type 2 diabetes and high cholesterol", "drink plenty of water", "take part in activities you enjoy to keep active like swimming, dancing, yoga or walking", "wear compression garments \u2013 tight forms of clothing that help to reduce pain and discomfort, as well as making it easier for you to walk", "look after your skin \u2013 using moisturising cream (emollients) regularly will help to stop your skin drying out", "manual lymphatic drainage \u2013 a specialist type of massage, which may help to reduce discomfort", "counselling or cognitive behavioural therapy (CBT) \u2013 if you\u2019re finding it difficult to cope or if it\u2019s affecting your mental health"]
    },
    "liver_cancer": {
        "diagnosis": "Liver cancer",
        "tier": "GREEN",
        "symptoms": ["loss of appetite and feeling full soon after starting to eat", "weight loss for no obvious reason", "feeling sick (nausea) and being sick (vomiting)", "tiredness (fatigue)", "the skin and the whites of the eyes looking yellow (jaundice)"],
        "reasoning": "Based on NHS Inform guidelines for Liver cancer.",
        "treatment": ["where the cancer is in the liver", "the size of the tumour or tumours", "how many tumours there are", "whether important blood vessels in the liver are affected", "whether the cancer has spread outside the liver (the stage of the cancer)", "how well your liver is working and your general health", "your preferences."]
    },
    "liver_disease": {
        "diagnosis": "Liver disease",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Liver disease.",
        "treatment": []
    },
    "loss_of_libido": {
        "diagnosis": "Loss of libido",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Loss of libido.",
        "treatment": []
    },
    "low_blood_pressure": {
        "diagnosis": "Low blood pressure",
        "tier": "GREEN",
        "symptoms": ["light-headedness or dizziness", "fainting", "blurred vision", "confusion", "feeling sick", "general weakness"],
        "reasoning": "Based on NHS Inform guidelines for Low blood pressure.",
        "treatment": ["consider making changes to any medicines that may be contributing to your low blood pressure", "suggest making small lifestyle changes", "suggest making dietary changes, including looking at your salt intake"]
    },
    "lung_cancer": {
        "diagnosis": "Lung cancer",
        "tier": "GREEN",
        "symptoms": ["bronchoscopy and biopsy", "ct scan and biopsy", "lung biopsy through the skin", "endobronchial ultrasound scan (ebus) biopsy", "endoscopic ultrasound (eus) biopsy", "biopsy of neck lymph nodes"],
        "reasoning": "Based on NHS Inform guidelines for Lung cancer.",
        "treatment": ["non-small cell lung cancer", "small cell lung cancer"]
    },
    "lupus": {
        "diagnosis": "Lupus",
        "tier": "GREEN",
        "symptoms": ["fatigue (extreme tiredness)", "rashes \u2013 particularly on the face, wrists and hands", "joint pain\u00a0and swelling"],
        "reasoning": "Based on NHS Inform guidelines for Lupus.",
        "treatment": []
    },
    "lyme_disease": {
        "diagnosis": "Lyme disease",
        "tier": "GREEN",
        "symptoms": ["usually develops around 3 to 30 days after you have been bitten", "may look like a bull\u2019s-eye on a dart board", "will be red", "may feel slightly raised at the edges", "may get bigger over several days or weeks", "is usually around 15 cm (6 inches) across, but it can be smaller or much larger"],
        "reasoning": "Based on NHS Inform guidelines for Lyme disease.",
        "treatment": ["for people who spend time in woodland or moorland areas", "from March to October because more people take part in outdoor activities"]
    },
    "lymphoedema": {
        "diagnosis": "Lymphoedema",
        "tier": "GREEN",
        "symptoms": ["an aching, heavy feeling", "difficulty moving", "skin infections that keep coming back", "the skin becoming hard and tight", "folds in the skin", "wart-like growths on the skin", "fluid leaking through the skin"],
        "reasoning": "Based on NHS Inform guidelines for Lymphoedema.",
        "treatment": ["compression bandages and garments \u2013 move fluid out of the affected limb and prevent more fluid from building up", "skin care \u2013 keeps the skin in good condition and reduces the chances of infection", "exercises \u2013 helps use muscles in the affected limb to improve lymph drainage", "manual lymphatic drainage (MLD) \u2013 a specialised massage that helps the flow of fluid in the lymphatic system and reduces swelling"]
    },
    "lymphogranuloma_venereum_lgv": {
        "diagnosis": "Lymphogranuloma venereum (LGV)",
        "tier": "GREEN",
        "symptoms": ["swollen lymph glands in the groin (in one or both sides)", "an ulcer or sore on the penis, vagina or around the anus"],
        "reasoning": "Based on NHS Inform guidelines for Lymphogranuloma venereum (LGV).",
        "treatment": ["chemsex", "having group sex", "fisting", "sharing sex toys that aren\u2019t washed or covered with a new condom each time they\u2019re used"]
    },
    "malaria": {
        "diagnosis": "Malaria",
        "tier": "GREEN",
        "symptoms": ["a high temperature (fever)", "headache", "sweats", "chills", "muscle aches or pains", "vomiting and or diarrhoea"],
        "reasoning": "Based on NHS Inform guidelines for Malaria.",
        "treatment": []
    },
    "malnutrition": {
        "diagnosis": "Malnutrition",
        "tier": "GREEN",
        "symptoms": ["loss of appetite and lack of interest in food or fluids", "unplanned weight loss \u2013 this might cause clothing, rings, watches or dentures to become loose", "tiredness or low energy levels", "reduced ability to perform everyday tasks like showering, getting dressed or cooking", "reduced muscle strength \u2013 for example, not being able to walk as far or as fast as usual", "changes in mood which might cause feelings of lethargy and depression", "poor concentration", "poor growth in children", "increased risk of infection, recurrent infections, taking longer to recover and poor wound healing", "difficulty keeping warm"],
        "reasoning": "Based on NHS Inform guidelines for Malnutrition.",
        "treatment": []
    },
    "measles": {
        "diagnosis": "Measles",
        "tier": "GREEN",
        "symptoms": ["cold-like symptoms, such as a runny nose, sneezing, and a cough", "sore, red eyes that may be sensitive to light", "watery eyes", "swollen eyes", "a high temperature (fever), which may reach around 40\u00b0c (104\u00b0f)", "small greyish-white spots in the mouth", "aches and pains", "loss of appetite", "tiredness, irritability and a general lack of energy"],
        "reasoning": "Based on NHS Inform guidelines for Measles.",
        "treatment": ["take paracetamol or ibuprofen to relieve fever, aches and pains \u2013 aspirin should not be given to children under 16 years old", "drink plenty of water to avoid dehydration", "use damp cotton wool to clean the eyes"]
    },
    "mechanical_neck_pain": {
        "diagnosis": "Mechanical neck pain",
        "tier": "GREEN",
        "symptoms": ["pain and stiffness", "muscle tightness or spasms", "numbness and tingling", "clicking and grinding \u2013 this is quite common and can sound alarming but is not usually serious"],
        "reasoning": "Based on NHS Inform guidelines for Mechanical neck pain.",
        "treatment": ["staying active", "modifying activities and pacing techniques", "maintaining a healthy weight", "stopping smoking", "managing stress and emotional wellbeing"]
    },
    "meningitis": {
        "diagnosis": "Meningitis",
        "tier": "RED",
        "symptoms": ["a high temperature (fever) over 37.5c (99.5f)", "being sick", "a headache", "a blotchy rash that doesn\u2019t fade when a glass is rolled over it (this won\u2019t always develop)", "a stiff neck", "a dislike of bright lights", "drowsiness or unresponsiveness", "seizures (fits)"],
        "reasoning": "Based on NHS Inform guidelines for Meningitis.",
        "treatment": ["antibiotics given directly into a vein", "fluids given directly into a vein", "oxygen through a face mask"]
    },
    "meniere_s_disease": {
        "diagnosis": "Meniere’s disease",
        "tier": "GREEN",
        "symptoms": ["vertigo \u2013 the feeling that you, or the environment around you, is moving or spinning", "tinnitus \u2013 hearing sounds from inside your body, rather than from an outside source", "hearing loss, with a particular difficulty hearing deep or low sounds", "a feeling of pressure or fullness deep inside the ear", "feeling or being sick"],
        "reasoning": "Based on NHS Inform guidelines for Meniere’s disease.",
        "treatment": ["medicines to treat the symptoms and prevent attacks", "changes to your eating habits, such as a low-salt diet", "treatment for tinnitus", "treatment for hearing loss", "balance training (vestibular rehabilitation)", "relaxation techniques", "surgery \u2013 only rarely, in more severe cases"]
    },
    "later_years_around_50_years_and_over": {
        "diagnosis": "Later years (around 50 years and over)",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Later years (around 50 years and over).",
        "treatment": []
    },
    "mesothelioma": {
        "diagnosis": "Mesothelioma",
        "tier": "GREEN",
        "symptoms": ["chest x-ray", "ct scan", "pleural aspiration", "pleural biopsy"],
        "reasoning": "Based on NHS Inform guidelines for Mesothelioma.",
        "treatment": ["chemotherapy", "radiotherapy", "surgery", "immunotherapy"]
    },
    "metacarpal_fracture_of_the_hand": {
        "diagnosis": "Metacarpal fracture of the hand",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Metacarpal fracture of the hand.",
        "treatment": []
    },
    "middle_ear_infection_otitis_media": {
        "diagnosis": "Middle ear infection (otitis media)",
        "tier": "YELLOW",
        "symptoms": ["earache", "a high temperature (fever)", "being sick", "a lack of energy", "slight hearing loss \u2013 if the middle ear becomes filled with fluid"],
        "reasoning": "Based on NHS Inform guidelines for Middle ear infection (otitis media).",
        "treatment": ["the Eustachian tube is smaller in children than in adults", "a child\u2019s adenoids are relatively larger than an adults"]
    },
    "migraine": {
        "diagnosis": "Migraine",
        "tier": "GREEN",
        "symptoms": ["nausea", "vomiting", "increased sensitivity to light and sound \u2013 which is why many people with a migraine headache want to rest in a quiet, dark room", "sweating", "poor concentration", "feeling very hot or very cold", "abdominal (tummy) pain", "diarrhoea", "dizziness (light headedness)"],
        "reasoning": "Based on NHS Inform guidelines for Migraine.",
        "treatment": []
    },
    "minor_head_injury": {
        "diagnosis": "Minor head injury",
        "tier": "GREEN",
        "symptoms": ["a mild headache", "nausea (feeling sick)", "dizziness", "blurred vision"],
        "reasoning": "Based on NHS Inform guidelines for Minor head injury.",
        "treatment": []
    },
    "miscarriage": {
        "diagnosis": "Miscarriage",
        "tier": "GREEN",
        "symptoms": ["have sharp, sudden and intense stomach pains", "feel very dizzy or faint", "feel very sick", "look very pale", "have vaginal bleeding or spotting, commonly after the pain has started", "have pain in your shoulder tip", "have diarrhoea and are vomiting"],
        "reasoning": "Based on NHS Inform guidelines for Miscarriage.",
        "treatment": []
    },
    "molar_pregnancy": {
        "diagnosis": "Molar pregnancy",
        "tier": "GREEN",
        "symptoms": ["vaginal bleeding", "a dark discharge from the vagina that contains small, grape-like lumps", "severe morning sickness", "a high temperature", "an unusually swollen tummy", "high blood pressure", "protein in your pee, which might make your pee foamy, frothy or bubbly", "tiredness", "weakness", "twitching or trembling"],
        "reasoning": "Based on NHS Inform guidelines for Molar pregnancy.",
        "treatment": []
    },
    "motor_neurone_disease_mnd": {
        "diagnosis": "Motor neurone disease (MND)",
        "tier": "GREEN",
        "symptoms": ["you have early symptoms of mnd"],
        "reasoning": "Based on NHS Inform guidelines for Motor neurone disease (MND).",
        "treatment": []
    },
    "mouth_cancer": {
        "diagnosis": "Mouth cancer",
        "tier": "GREEN",
        "symptoms": ["inside of the cheeks", "roof of the mouth", "lip", "gum", "tongue"],
        "reasoning": "Based on NHS Inform guidelines for Mouth cancer.",
        "treatment": ["a speech and language therapist (SLT)", "a dietitian", "a restorative dentist", "a dental hygienist", "sometimes a physiotherapist"]
    },
    "mouth_ulcer": {
        "diagnosis": "Mouth ulcer",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Mouth ulcer.",
        "treatment": ["use a soft toothbrush to brush your teeth", "drink cool drinks through a straw", "eat softer foods", "get regular dental check-ups", "eat a healthy, balanced diet", "try to reduce stress and anxiety"]
    },
    "myeloma": {
        "diagnosis": "Myeloma",
        "tier": "GREEN",
        "symptoms": ["constant bone pain in 1 area (such as in the back, ribs, hip or pelvis)", "an increase in the risk of infection or having infections, one after another, that need antibiotics to treat them", "becoming anaemic and bruising and bleeding more easily \u2013 anaemia is when the number of red blood cells in your blood is low", "feeling extremely tired (fatigue)", "tingling or numbness in the hands or feet, though this is rare"],
        "reasoning": "Based on NHS Inform guidelines for Myeloma.",
        "treatment": ["targeted therapies", "chemotherapy", "steroids", "managing symptoms"]
    },
    "multiple_sclerosis_ms": {
        "diagnosis": "Multiple sclerosis (MS)",
        "tier": "GREEN",
        "symptoms": ["feel weak", "become stiff and resistant to movement (spasticity)", "contract tightly and painfully (spasm)"],
        "reasoning": "Based on NHS Inform guidelines for Multiple sclerosis (MS).",
        "treatment": ["relapsing remitting MS", "secondary progressive MS who meet certain criteria, like the number of relapses they\u2019ve had", "primary progressive MS who meet certain criteria like new lesions found by an MRI scan"]
    },
    "multiple_system_atrophy_msa": {
        "diagnosis": "Multiple system atrophy (MSA)",
        "tier": "GREEN",
        "symptoms": ["bladder problems like a constant need to pee, loss of bladder control (urinary incontinence) or being unable to pee", "low blood pressure when standing up which might cause\u00a0dizziness\u00a0or fainting (postural hypotension)", "erection problems like\u00a0erectile dysfunction", "problems with co-ordination, balance and speech (cerebellar ataxia)", "tremor, slowness and muscle stiffness", "constipation"],
        "reasoning": "Based on NHS Inform guidelines for Multiple system atrophy (MSA).",
        "treatment": []
    },
    "mumps": {
        "diagnosis": "Mumps",
        "tier": "GREEN",
        "symptoms": ["headaches", "joint pain", "feeling sick", "dry mouth", "mild stomach (abdominal) pain", "feeling tired", "loss of appetite", "a high temperature (fever) of 38\u00b0c (100.4\u00b0f), or above"],
        "reasoning": "Based on NHS Inform guidelines for Mumps.",
        "treatment": ["get plenty of bed rest", "drink plenty of water to avoid dehydration", "use pain relief such as paracetamol or ibuprofen \u2013 aspirin shouldn\u2019t be given to children under 16", "apply a warm or cool compress to the swollen glands to help relieve pain", "eat foods that don\u2019t need a lot of chewing, such as soup, mashed potatoes and scrambled eggs"]
    },
    "munchausen_s_syndrome": {
        "diagnosis": "Munchausen’s syndrome",
        "tier": "GREEN",
        "symptoms": ["frequent visits to hospitals in different areas", "claiming to have a history of complex and serious medical conditions, yet there is little documentary evidence to support this; a common ruse is for people to claim they have spent a long time out of the country", "symptoms that do not correspond to the results of tests", "symptoms that get worse for no apparent reason", "the person has a extremely good medical knowledge", "the person receives very few, or no, visitors in hospital; many people with munchausen\u2019s syndrome adopt a solitary lifestyle and have little contact with any friends of family", "a willingness to undergo often painful or dangerous tests and procedures", "if confronted about their behaviour, they can become aggressive and will try to leave the hospital"],
        "reasoning": "Based on NHS Inform guidelines for Munchausen’s syndrome.",
        "treatment": ["About NHS inform", "Editorial policy", "How this information was written"]
    },
    "muscular_dystrophy": {
        "diagnosis": "Muscular dystrophy",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Muscular dystrophy.",
        "treatment": ["low-impact exercise like swimming", "physiotherapy to work on muscle strength and flexibility", "physical aids like a walking stick, crutches or a wheelchair", "occupational therapy to help maintain independence"]
    },
    "myasthenia_gravis": {
        "diagnosis": "Myasthenia gravis",
        "tier": "GREEN",
        "symptoms": ["slurred speech", "difficulty swallowing", "difficulty making facial expressions like smiling", "problems with chewing", "a change in your voice", "choking or accidentally inhaling food which can cause chest infections", "shortness of breath"],
        "reasoning": "Based on NHS Inform guidelines for Myasthenia gravis.",
        "treatment": []
    },
    "mycoplasma_genitalium_mgen": {
        "diagnosis": "Mycoplasma genitalium (Mgen)",
        "tier": "GREEN",
        "symptoms": ["pain when peeing", "unusual discharge from the vagina, penis or anus", "pain in the lower tummy, bleeding after sex, and bleeding between periods", "pain in the testicles", "inflammation in the rectum"],
        "reasoning": "Based on NHS Inform guidelines for Mycoplasma genitalium (Mgen).",
        "treatment": ["using a new condom each time you use sex toys", "washing sex toys after each time they\u2019re used"]
    },
    "myotonic_dystrophy": {
        "diagnosis": "Myotonic dystrophy",
        "tier": "GREEN",
        "symptoms": ["muscle stiffness (myotonia)", "clouding of the eye lens (cataracts)", "a slow and irregular heartbeat (cardiac arrhythmia)", "slurred speech", "dysphagia (problems with swallowing)", "bowel problems like diarrhoea, constipation and incontinence", "behavioural and personality problems", "excessive sleepiness or tiredness"],
        "reasoning": "Based on NHS Inform guidelines for Myotonic dystrophy.",
        "treatment": ["physiotherapy to work on muscle strength and flexibility", "physical aids like a walking stick, crutches or a wheelchair", "occupational therapy to help maintain independence"]
    },
    "nasal_and_sinus_cancer": {
        "diagnosis": "Nasal and sinus cancer",
        "tier": "GREEN",
        "symptoms": ["a blocked nose, usually only on 1 side, that does not go away", "nosebleeds", "pressure or pain behind your nose or in your upper teeth", "blood when you blow your nose", "losing your sense of smell"],
        "reasoning": "Based on NHS Inform guidelines for Nasal and sinus cancer.",
        "treatment": ["the position of the cancer", "the stage and grade of the cancer", "type of cell the cancer started in", "your general health"]
    },
    "nasopharyngeal_cancer": {
        "diagnosis": "Nasopharyngeal cancer",
        "tier": "GREEN",
        "symptoms": ["a painless swelling or lump in the upper neck \u2013 this is often the first symptom", "changes in hearing", "earache", "fluid leaking from the ear", "a blocked nose", "nosebleeds", "a headache"],
        "reasoning": "Based on NHS Inform guidelines for Nasopharyngeal cancer.",
        "treatment": ["fertility in women after treatment", "fertility in men after treatment", "LGBTQ+ people and cancer treatment"]
    },
    "neck_injury": {
        "diagnosis": "Neck injury",
        "tier": "GREEN",
        "symptoms": ["neck stiffness", "difficulty turning your neck", "muscle spasms", "headaches", "nausea (feeling sick)", "dizziness", "blurred vision"],
        "reasoning": "Based on NHS Inform guidelines for Neck injury.",
        "treatment": []
    },
    "neck_problems": {
        "diagnosis": "Neck problems",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Neck problems.",
        "treatment": ["Exercises for neck problems", "Soft tissue injury advice", "When should I take painkillers?", "How to access MSK services"]
    },
    "neuroendocrine_tumours": {
        "diagnosis": "Neuroendocrine tumours",
        "tier": "GREEN",
        "symptoms": ["von hippel-lindau (vhl) disease", "tubular sclerosis (tsc)", "neurofibromatosis (nf)"],
        "reasoning": "Based on NHS Inform guidelines for Neuroendocrine tumours.",
        "treatment": ["where the NET started", "the size of the tumour and whether it has spread (its stage)", "whether you have symptoms of carcinoid syndrome or the over-production of other hormones", "the appearance of the cells under a microscope (its grade)"]
    },
    "non_alcoholic_fatty_liver_disease_nafld": {
        "diagnosis": "Non-alcoholic fatty liver disease (NAFLD)",
        "tier": "GREEN",
        "symptoms": ["a dull or aching pain in the top right of the\u00a0tummy (over the lower right side of the ribs)", "fatigue (extreme tiredness)", "unexplained weight loss", "weakness"],
        "reasoning": "Based on NHS Inform guidelines for Non-alcoholic fatty liver disease (NAFLD).",
        "treatment": ["About NHS inform", "Editorial policy", "How this information was written"]
    },
    "non_hodgkin_lymphoma": {
        "diagnosis": "Non-Hodgkin lymphoma",
        "tier": "GREEN",
        "symptoms": ["the levels of different blood cells in your blood", "whether you have certain infections linked to lymphoma, such as hiv and hepatitis."],
        "reasoning": "Based on NHS Inform guidelines for Non-Hodgkin lymphoma.",
        "treatment": ["delaying treatment until symptoms develop \u2013 this is called watch and wait", "having treatment with a targeted therapy drug called rituximab"]
    },
    "norovirus": {
        "diagnosis": "Norovirus",
        "tier": "GREEN",
        "symptoms": ["suddenly feeling sick", "projectile vomiting", "watery\u00a0diarrhoea"],
        "reasoning": "Based on NHS Inform guidelines for Norovirus.",
        "treatment": []
    },
    "nosebleed": {
        "diagnosis": "Nosebleed",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Nosebleed.",
        "treatment": ["looking inside your nose", "measuring your pulse and blood pressure", "carrying out blood tests", "asking about any other symptoms you have"]
    },
    "obesity": {
        "diagnosis": "Obesity",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Obesity.",
        "treatment": []
    },
    "obsessive_compulsive_disorder_ocd": {
        "diagnosis": "Obsessive compulsive disorder (OCD)",
        "tier": "GREEN",
        "symptoms": ["obsessive thoughts and compulsive behaviours are affecting your daily life", "you\u2019re not looking after yourself", "you\u2019re finding it hard to manage any responsibilities you have"],
        "reasoning": "Based on NHS Inform guidelines for Obsessive compulsive disorder (OCD).",
        "treatment": ["cognitive behavioural therapy (CBT)", "medication"]
    },
    "obstructive_sleep_apnoea": {
        "diagnosis": "Obstructive sleep apnoea",
        "tier": "GREEN",
        "symptoms": ["being very sleepy during the day", "breathing pauses through the night \u2013 this may be noticed by a partner, friend or relative", "loud snoring", "noisy and/or laboured breathing", "repeated periods where breathing stops or is interrupted by gasping or snorting"],
        "reasoning": "Based on NHS Inform guidelines for Obstructive sleep apnoea.",
        "treatment": ["losing weight", "stopping smoking", "cutting down on alcohol", "sleeping on your side", "avoiding sedative medications and sleeping tablets"]
    },
    "oculopharyngeal_muscular_dystrophy_opmd": {
        "diagnosis": "Oculopharyngeal muscular dystrophy (OPMD)",
        "tier": "GREEN",
        "symptoms": ["ptosis or droopy eyelids", "dysphagia (problems with swallowing)", "limb weakness in the muscles around the shoulders and hips", "problems with eye movements"],
        "reasoning": "Based on NHS Inform guidelines for Oculopharyngeal muscular dystrophy (OPMD).",
        "treatment": ["have poor mobility", "spend a lot of time sitting down"]
    },
    "oesophageal_cancer": {
        "diagnosis": "Oesophageal cancer",
        "tier": "GREEN",
        "symptoms": ["which layers of the oesophageal wall the cancer is in", "whether the cancer has spread outside the oesophagus."],
        "reasoning": "Based on NHS Inform guidelines for Oesophageal cancer.",
        "treatment": ["the type of oesophageal cancer you have", "where the cancer is in the oesophagus \u2013 in the upper, middle or lower oesophagus", "the stage and grade of the cancer", "your general health and level of fitness", "your personal choices"]
    },
    "oral_thrush_in_adults": {
        "diagnosis": "Oral thrush in adults",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Oral thrush in adults.",
        "treatment": []
    },
    "osteoarthritis": {
        "diagnosis": "Osteoarthritis",
        "tier": "GREEN",
        "symptoms": ["joint tenderness", "increased pain and stiffness when you have not moved your joints for a while", "joints appearing slightly larger or more \u2018knobbly\u2019 than usual", "a grating or crackling sound or sensation in your joints", "limited range of movement in your joints", "weakness and loss of muscle bulk"],
        "reasoning": "Based on NHS Inform guidelines for Osteoarthritis.",
        "treatment": []
    },
    "osteoarthritis_of_the_hip": {
        "diagnosis": "Osteoarthritis of the hip",
        "tier": "GREEN",
        "symptoms": ["pain in or around the hip joint, groin area, buttock or front thigh that can be worse when moving or doing activities.", "stiffness in the hip, often in the morning or after resting.", "locking, sticking or grinding of the hip", "weakness\u202fin the buttock muscles.", "difficulty in daily activities such as walking, going up/down stairs, getting up from a chair or out of a car."],
        "reasoning": "Based on NHS Inform guidelines for Osteoarthritis of the hip.",
        "treatment": ["Exercises for osteoarthritis of the hip", "Hip problems"]
    },
    "osteoarthritis_of_the_knee": {
        "diagnosis": "Osteoarthritis of the knee",
        "tier": "GREEN",
        "symptoms": ["joint pain that can be worse when moving or doing activities.", "stiffness in the knee, often in the morning or after resting.", "swelling in the joint.", "weakness\u202fin the thigh muscle.", "feeling the knee giving way during walking or weight-bearing.", "creaking,\u202fgrating\u202fand crunching noises as you move."],
        "reasoning": "Based on NHS Inform guidelines for Osteoarthritis of the knee.",
        "treatment": ["Exercises for osteoarthritis of the knee", "Knee problems"]
    },
    "osteoarthritis_of_the_hand": {
        "diagnosis": "Osteoarthritis of the hand",
        "tier": "GREEN",
        "symptoms": ["wrists", "fingers", "thumb", "hands"],
        "reasoning": "Based on NHS Inform guidelines for Osteoarthritis of the hand.",
        "treatment": []
    },
    "osteoporosis": {
        "diagnosis": "Osteoporosis",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Osteoporosis.",
        "treatment": []
    },
    "outer_ear_infection_otitis_externa": {
        "diagnosis": "Outer ear infection (otitis externa)",
        "tier": "YELLOW",
        "symptoms": ["ear pain", "itching and irritation in and around your ear canal", "redness and swelling of your outer ear and ear canal", "a feeling of pressure and fullness inside your ear", "scaly skin in and around your ear canal, which may peel off", "discharge from your ear, which can be either thin and watery or thick and pus-like", "tenderness when you move your ear or jaw", "swollen and sore glands in your throat", "some hearing loss"],
        "reasoning": "Based on NHS Inform guidelines for Outer ear infection (otitis externa).",
        "treatment": ["avoid getting your affected ear wet \u2013 wearing a shower cap while showering and bathing if you aren\u2019t washing your hair can help", "avoid swimming until the condition has fully cleared", "remove any discharge by gently swabbing your outer ear with cotton wool \u2013 do not stick cotton wool or a cotton bud inside your ear", "remove anything from your affected ear that may cause an allergic reaction, such as hearing aids, ear plugs and earrings", "use pain relief such as paracetamol or ibuprofen to relieve ear pain \u2013 these aren\u2019t suitable for everyone, so make sure you check the information leaflet that comes with the medication first and if you\u2019re still unsure, check with your GP, practice nurse or pharmacist", "if your condition is caused by a boil in your ear, placing a warm flannel or cloth over the affected ear can help it heal faster"]
    },
    "ovarian_cancer": {
        "diagnosis": "Ovarian cancer",
        "tier": "GREEN",
        "symptoms": ["a swollen tummy", "pain in the back or lower tummy"],
        "reasoning": "Based on NHS Inform guidelines for Ovarian cancer.",
        "treatment": ["the treatment you had before", "how long it kept the cancer away", "if you had any difficult side effects from previous treatments"]
    },
    "ovarian_cyst": {
        "diagnosis": "Ovarian cyst",
        "tier": "GREEN",
        "symptoms": ["you have sudden, severe pelvic pain"],
        "reasoning": "Based on NHS Inform guidelines for Ovarian cyst.",
        "treatment": ["size and appearance of the cysts", "whether you have any symptoms", "whether you\u2019re\u00a0post-menopausal\u00a0(due to the slightly higher risk of\u00a0ovarian cancer)"]
    },
    "overactive_thyroid": {
        "diagnosis": "Overactive thyroid",
        "tier": "GREEN",
        "symptoms": ["hyperactivity", "mood swings \u2013 such as anxiety, irritability and nervousness", "difficulty sleeping (insomnia)", "feeling tired all the time (fatigue)", "muscle weakness", "needing to poo or pee more\u00a0frequently", "excess fats in your poo \u2013 which can make them greasy and difficult to flush down the toilet (steatorrhoea)", "sensitivity to heat and\u00a0excess sweating", "unexplained or unexpected weight loss \u2013 despite having an increased appetite (though in a small number of cases, the increase in appetite can lead to weight gain)", "very infrequent or light periods, or periods stopping altogether"],
        "reasoning": "Based on NHS Inform guidelines for Overactive thyroid.",
        "treatment": ["thionamides \u2013 a group of medications, including\u00a0carbimazole and methimazole,\u00a0that stop the thyroid gland producing too much thyroid hormone", "radioiodine treatment \u2013\u00a0a radioactive substance called iodine that helps shrink the thyroid gland, reducing its activity (the radiation contained in iodine is a very low dose and does not pose a threat to health)", "surgery \u2013\u00a0in a small number of cases surgery may be required to remove some or all of the\u00a0thyroid gland, particularly if there is a large goitre"]
    },
    "pain_in_the_ball_of_the_foot": {
        "diagnosis": "Pain in the ball of the foot",
        "tier": "GREEN",
        "symptoms": ["there\u2019s been new, significant trauma within the last 7 days, for example a fall from height or direct blow to the foot", "your foot is misshapen following a new injury", "you can\u2019t put any weight at all through your foot"],
        "reasoning": "Based on NHS Inform guidelines for Pain in the ball of the foot.",
        "treatment": ["maintain your current levels of fitness \u2013 even if you have to modify what you normally do, any activity is better than none", "keep your other muscles and joints strong and flexible", "prevent a recurrence of the problem", "help you aim for a healthy body weight"]
    },
    "paget_s_disease_of_the_breast": {
        "diagnosis": "Paget’s disease of the breast",
        "tier": "GREEN",
        "symptoms": ["inflammation on the skin of the nipple and areola", "crusting, bleeding and ulcerating (becoming like an ulcer) on the skin of the nipple and areola", "thickening skin on the nipple or areola", "an itching or burning sensation in the area", "fluid (discharge) leaking from the area", "the nipple turning inwards (becoming inverted)"],
        "reasoning": "Based on NHS Inform guidelines for Paget’s disease of the breast.",
        "treatment": ["the size of the area of Paget\u2019s disease", "whether there is DCIS or invasive breast cancer", "where the affected area is in the breast"]
    },
    "pancreatic_cancer": {
        "diagnosis": "Pancreatic cancer",
        "tier": "GREEN",
        "symptoms": ["pain and discomfort in the upper part of the tummy (abdomen) that sometimes spreads out into the back", "signs of jaundice such as yellowing of the skin and the whites of the eyes, itchy skin, dark pee (urine) or pale and smelly poo (stools) that are difficult to flush away (steatorrhoea)", "unexplained weight loss"],
        "reasoning": "Based on NHS Inform guidelines for Pancreatic cancer.",
        "treatment": ["phone the Macmillan Support Line on 0808 808 00 00", "chat to their specialists online", "visit Macmillan\u2019s pancreatic cancer forum to talk with people who have been affected by pancreatic cancer, share your experience, and ask an expert your questions"]
    },
    "panic_disorder": {
        "diagnosis": "Panic disorder",
        "tier": "GREEN",
        "symptoms": ["a sensation that your heart is beating irregularly (palpitations)", "sweating", "trembling", "hot flushes", "chills", "shortness of breath", "a choking sensation", "chest pain", "nausea", "dizziness"],
        "reasoning": "Based on NHS Inform guidelines for Panic disorder.",
        "treatment": []
    },
    "parkinson_s_disease": {
        "diagnosis": "Parkinson’s disease",
        "tier": "GREEN",
        "symptoms": ["tremor\u00a0\u2013 shaking, which usually begins in the hand or arm and is more likely to occur when the limb is relaxed and\u00a0resting", "slowness of movement (bradykinesia) \u2013 where physical movements are much slower than normal, which can make everyday tasks difficult and can result in a distinctive slow, shuffling walk with very small steps", "muscle stiffness (rigidity) \u2013 stiffness and tension in the muscles, which can make it difficult to move around and make facial expressions, and can result in painful muscle cramps (dystonia)"],
        "reasoning": "Based on NHS Inform guidelines for Parkinson’s disease.",
        "treatment": []
    },
    "patau_s_syndrome": {
        "diagnosis": "Patau’s syndrome",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Patau’s syndrome.",
        "treatment": []
    },
    "patellofemoral_pain_syndrome": {
        "diagnosis": "Patellofemoral pain syndrome",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Patellofemoral pain syndrome.",
        "treatment": ["Exercises for patellofemoral knee pain", "Knee problems"]
    },
    "pelvic_inflammatory_disease": {
        "diagnosis": "Pelvic inflammatory disease",
        "tier": "GREEN",
        "symptoms": ["pain around the pelvis or lower tummy", "discomfort or pain during sex that is felt deep inside the pelvis", "pain when peeing", "bleeding between periods or after sex", "heavy periods", "painful periods", "unusual vaginal discharge"],
        "reasoning": "Based on NHS Inform guidelines for Pelvic inflammatory disease.",
        "treatment": ["pelvic abscesses", "long-term pelvic pain, or pelvic pain that keeps coming back", "reduced fertility or infertility", "ectopic pregnancy"]
    },
    "pelvic_organ_prolapse": {
        "diagnosis": "Pelvic organ prolapse",
        "tier": "GREEN",
        "symptoms": ["a feeling of a bulge or something coming down the vagina", "a feeling of a bulge or something coming out the vagina, which sometimes needs pushed back up (you may be able to see this with a mirror)", "discomfort during sex", "problems peeing \u2013 a slow stream, a feeling of not emptying your bladder fully, needing to go to the toilet a lot or leaking"],
        "reasoning": "Based on NHS Inform guidelines for Pelvic organ prolapse.",
        "treatment": ["vaginal discharge", "irritation, bleeding or sores inside your vagina", "stress incontinence", "difficulty with bowel movements", "difficulty having sex (although most women can have sex without problems)", "an imbalance of the usual bacteria found in your vagina"]
    },
    "penile_cancer": {
        "diagnosis": "Penile cancer",
        "tier": "GREEN",
        "symptoms": ["a growth or sore (ulcer) anywhere on the penis", "thickening or raised areas anywhere on the penis", "changes in the colour of the skin, such as redness, white patches or areas that look blueish, brown or black", "discharge or bleeding", "pain, a lump, or discharge underneath the foreskin, which is usually only seen if the foreskin is pulled back"],
        "reasoning": "Based on NHS Inform guidelines for Penile cancer.",
        "treatment": ["before surgery, to shrink the cancer to make it easier to remove", "after surgery, to reduce the risks of cancer coming back", "to treat cancer that has spread to other parts of the body"]
    },
    "peripheral_neuropathy": {
        "diagnosis": "Peripheral neuropathy",
        "tier": "GREEN",
        "symptoms": ["a prickling or tingling sensation in the affected body part", "\u2018pins and needles\u2019 in the affected body part", "a burning or sharp pain, usually in the feet", "numbness in the affected body part", "being less able to feel pain or changes in temperature, particularly in your feet", "being more able to feel pain, to the point that even a light touch causes you pain (allodynia)", "the loss of balance or co-ordination (sensory ataxia)"],
        "reasoning": "Based on NHS Inform guidelines for Peripheral neuropathy.",
        "treatment": []
    },
    "personality_disorder": {
        "diagnosis": "Personality disorder",
        "tier": "GREEN",
        "symptoms": ["disordered thinking", "impulsive behaviour", "problems controlling your emotions", "concerns that other people will abandon you", "intense but unstable relationships"],
        "reasoning": "Based on NHS Inform guidelines for Personality disorder.",
        "treatment": ["depression", "anxiety", "psychotic symptoms"]
    },
    "perthes_disease": {
        "diagnosis": "Perthes’ disease",
        "tier": "GREEN",
        "symptoms": ["pain in the groin, thigh, or knee, especially after activity", "limping", "stiffness and reduced movement of the hip"],
        "reasoning": "Based on NHS Inform guidelines for Perthes’ disease.",
        "treatment": ["physiotherapy", "putting less weight through the affected leg", "surgery to reshape the hip joint in more severe cases"]
    },
    "pims": {
        "diagnosis": "PIMS",
        "tier": "GREEN",
        "symptoms": ["red rash (spots or blotches) which may be there all the time, or come and go", "red eyes (conjunctivitis) which are not sticky or itchy", "abdominal pain which might be severe, like appendicitis", "vomiting and/or diarrhoea", "sore throat, cough, breathlessness", "swollen glands", "sore red mouth", "swollen hands and feet", "headache", "dizziness"],
        "reasoning": "Based on NHS Inform guidelines for PIMS.",
        "treatment": ["is feeling very weak or dizzy", "is very sleepy or confused", "has a rash and/or red eyes", "has severe or worsening abdominal pain"]
    },
    "plantar_heel_pain": {
        "diagnosis": "Plantar heel pain",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Plantar heel pain.",
        "treatment": ["pain medication \u2013 this can help you move more comfortably, which can help your recovery", "ice packs"]
    },
    "pleurisy": {
        "diagnosis": "Pleurisy",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Pleurisy.",
        "treatment": ["Chest infection", "Flu", "Pneumonia"]
    },
    "pneumonia": {
        "diagnosis": "Pneumonia",
        "tier": "YELLOW",
        "symptoms": ["get plenty of rest", "take antibiotics if prescribed them \u2013 always finish the course, even if you feel better, unless you\u2019re told otherwise by a healthcare professional", "drink plenty of fluids", "take pain relief such as paracetamol if needed \u2013 always follow the manufacturer\u2019s instructions"],
        "reasoning": "Based on NHS Inform guidelines for Pneumonia.",
        "treatment": ["get plenty of rest", "take antibiotics if prescribed them \u2013 always finish the course, even if you feel better, unless you\u2019re told otherwise by a healthcare professional", "drink plenty of fluids", "take pain relief such as paracetamol if needed \u2013 always follow the manufacturer\u2019s instructions"]
    },
    "polio": {
        "diagnosis": "Polio",
        "tier": "GREEN",
        "symptoms": ["a high temperature (fever) of 38c (100.4f) or above", "a\u00a0sore throat", "a\u00a0headache", "abdominal (tummy) pain", "aching muscles", "feeling and being sick"],
        "reasoning": "Based on NHS Inform guidelines for Polio.",
        "treatment": []
    },
    "polymyalgia_rheumatica": {
        "diagnosis": "Polymyalgia rheumatica",
        "tier": "GREEN",
        "symptoms": ["high temperature (fever) and sweating", "extreme tiredness (fatigue)", "loss of appetite", "weight loss", "depression"],
        "reasoning": "Based on NHS Inform guidelines for Polymyalgia rheumatica.",
        "treatment": ["how well you\u2019re responding to treatment", "whether your dose of prednisolone needs to be adjusted", "how well you\u2019re coping with the side effects of the medication"]
    },
    "post_concussion_syndrome": {
        "diagnosis": "Post-concussion syndrome",
        "tier": "GREEN",
        "symptoms": ["persistent headaches that can be mild or severe, but last a long time", "dizziness", "nausea (feeling sick)", "sensitivity to bright lights", "sensitivity to loud noises", "tinnitus (ringing in the ears)", "double or blurred vision", "fatigue (tiredness)", "changed or reduced sense of smell and taste"],
        "reasoning": "Based on NHS Inform guidelines for Post-concussion syndrome.",
        "treatment": []
    },
    "post_polio_syndrome": {
        "diagnosis": "Post-polio syndrome",
        "tier": "GREEN",
        "symptoms": ["muscle weakness", "shrinking of the muscles (atrophy)", "tight joints (contractures)", "pain in muscles or joints", "chronic fatigue including physical tiredness and brain fatigue", "swallowing and speech problems", "respiratory problems like breathlessness and sleep apnoea", "cramps and muscle twitching", "being sensitive to cold temperatures"],
        "reasoning": "Based on NHS Inform guidelines for Post-polio syndrome.",
        "treatment": ["neurologists", "respiratory specialists", "physiotherapists", "orthotists", "psychologists", "pain management specialists", "occupational therapists"]
    },
    "popliteal_cysts_in_children_and_young_people": {
        "diagnosis": "Popliteal cysts in children and young people",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Popliteal cysts in children and young people.",
        "treatment": ["your child is complaining of significant pain where the cyst is", "it\u2019s restricting their movement", "the swelling doesn\u2019t reduce and keeps getting bigger"]
    },
    "positional_talipes_in_children_and_young_people": {
        "diagnosis": "Positional talipes in children and young people",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Positional talipes in children and young people.",
        "treatment": []
    },
    "postural_orthostatic_tachycardia_syndrome_pots": {
        "diagnosis": "Postural orthostatic tachycardia syndrome (PoTS)",
        "tier": "GREEN",
        "symptoms": ["dizziness or light-headedness", "fainting or almost fainting", "a noticeably strong, fast heartbeat (palpitations)", "chest pain", "shortness of breath", "shaking", "sweating", "sleep disturbance"],
        "reasoning": "Based on NHS Inform guidelines for Postural orthostatic tachycardia syndrome (PoTS).",
        "treatment": ["changes to your diet", "pacing to manage and conserve your energy", "compression clothing for example support tights", "sleep management", "specialised exercise (discuss with your healthcare professional before starting)"]
    },
    "postnatal_depression": {
        "diagnosis": "Postnatal depression",
        "tier": "GREEN",
        "symptoms": ["a persistent feeling of sadness and low mood", "loss of interest in the world around you", "no longer enjoying things that used to give you pleasure", "lack of energy and feeling tired all the time", "trouble sleeping at night", "feeling that you\u2019re unable to look after your baby", "problems concentrating and making decisions", "loss of appetite or comfort eating", "feeling agitated or irritable", "feelings of guilt, hopelessness and self-blame"],
        "reasoning": "Based on NHS Inform guidelines for Postnatal depression.",
        "treatment": ["you have moderate or severe depression", "you don\u2019t want to try psychological treatment", "psychological treatment doesn\u2019t help", "you have mild postnatal depression and a previous history of depression"]
    },
    "ready_steady_baby": {
        "diagnosis": "Ready Steady Baby!",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Ready Steady Baby!.",
        "treatment": []
    },
    "pressure_ulcers": {
        "diagnosis": "Pressure ulcers",
        "tier": "GREEN",
        "symptoms": ["are discoloured and don\u2019t change colour when pressed \u2013 the patches are usually red on white skin, or purple or blue on black or brown skin", "feel warm, spongy or hard", "become painful"],
        "reasoning": "Based on NHS Inform guidelines for Pressure ulcers.",
        "treatment": ["specially designed mattresses and cushions", "dressings to protect the ulcer and help it heal", "creams and ointments", "antibiotics (if the ulcer is infected)", "cleaning the ulcer"]
    },
    "progressive_supranuclear_palsy_psp": {
        "diagnosis": "Progressive supranuclear palsy (PSP)",
        "tier": "GREEN",
        "symptoms": ["repeated falls (often backwards) caused by a sudden loss of balance when walking", "muscle stiffness, especially in the neck", "fatigue", "changes in personality like mood swings and irritability", "changes in behaviour like recklessness and poor judgement", "dislike of bright lights (photophobia)", "eye problems like blurred or double vision, problems looking up and down, or involuntary eye closure", "tremors (involuntary shaking of parts of the body)", "slow movement"],
        "reasoning": "Based on NHS Inform guidelines for Progressive supranuclear palsy (PSP).",
        "treatment": []
    },
    "prostate_cancer": {
        "diagnosis": "Prostate cancer",
        "tier": "GREEN",
        "symptoms": ["early prostate cancer (or localised prostate cancer) \u2013 the cancer is only inside the prostate gland.", "locally-advanced prostate cancer \u2013 the cancer has spread through the capsule (covering) of the prostate gland and may have started to spread into tissue or organs close by.", "advanced prostate cancer (or metastatic prostate cancer) \u2013 the cancer has spread to other parts of the body, such as the bones."],
        "reasoning": "Based on NHS Inform guidelines for Prostate cancer.",
        "treatment": ["phone  the Macmillan Support Line on 0808 808 00 00", "chat online to Macmillan specialists", "visit the Macmillan prostate cancer forum to connect with people who have been affected by prostate cancer, share your experience, and ask your questions"]
    },
    "psoriatic_arthritis": {
        "diagnosis": "Psoriatic arthritis",
        "tier": "GREEN",
        "symptoms": ["hands", "feet", "knees", "elbows", "neck and spine"],
        "reasoning": "Based on NHS Inform guidelines for Psoriatic arthritis.",
        "treatment": ["help your symptoms", "slow the progression of the condition", "improve your quality of life"]
    },
    "psychosis": {
        "diagnosis": "Psychosis",
        "tier": "GREEN",
        "symptoms": ["hallucinations \u2013 you might see, hear, feel, taste, or smell things that aren\u2019t real, or you might hear voices", "delusions \u2013 you might believe things that are untrue, often this can lead someone to believe that someone is trying to harm them", "disordered thinking or speaking \u2013 you might speak more quickly or constantly, or switch from one topic to another mid-sentence"],
        "reasoning": "Based on NHS Inform guidelines for Psychosis.",
        "treatment": ["anti-psychotic medication", "psychological therapies \u2013 including talking therapies", "social support"]
    },
    "psychotic_depression": {
        "diagnosis": "Psychotic depression",
        "tier": "GREEN",
        "symptoms": ["sad and hopeless for most of the day", "like you have no interest in anything", "that it\u2019s impossible to get through the day"],
        "reasoning": "Based on NHS Inform guidelines for Psychotic depression.",
        "treatment": ["medication \u2013 taking a combination of antipsychotics and antidepressants can help", "psychological therapies \u2013 cognitive behavioural therapy (CBT) is a talking therapy that can help treat psychosis", "social support \u2013 support with social needs like employment, education and accommodation"]
    },
    "pubic_lice": {
        "diagnosis": "Pubic lice",
        "tier": "GREEN",
        "symptoms": ["small red or blue spots on your skin (lice bites)", "white or yellow dots attached to your hair (lice eggs)", "dark red or brown spots in your underwear (lice poo)", "crusty or sticky eyelashes, if they\u2019re infected"],
        "reasoning": "Based on NHS Inform guidelines for Pubic lice.",
        "treatment": ["wash your clothes and bedding on a hot wash (50 degrees or higher), have them dry cleaned or put them in a plastic bag for at least a week \u2013 this will help kill any lice", "hoover your mattress to remove any lice"]
    },
    "pulmonary_hypertension": {
        "diagnosis": "Pulmonary hypertension",
        "tier": "GREEN",
        "symptoms": ["shortness of breath", "fatigue (extreme tiredness)", "dizziness", "feeling faint", "chest pain (angina)", "a racing heartbeat (tachycardia)"],
        "reasoning": "Based on NHS Inform guidelines for Pulmonary hypertension.",
        "treatment": []
    },
    "phobias": {
        "diagnosis": "Phobias",
        "tier": "GREEN",
        "symptoms": ["phobias self-help guide", "10 ways to fight your fears"],
        "reasoning": "Based on NHS Inform guidelines for Phobias.",
        "treatment": ["Phobias self-help guide", "10 ways to fight your fears"]
    },
    "pelvic_girdle_pain": {
        "diagnosis": "Pelvic girdle pain",
        "tier": "GREEN",
        "symptoms": ["pain in the lower part of your tummy between your hip bones, lower back, hips and legs", "clicking or grinding in your pelvic area"],
        "reasoning": "Based on NHS Inform guidelines for Pelvic girdle pain.",
        "treatment": ["exercises to strengthen your abdominal (tummy) and pelvic floor muscles, as well as back and hip muscles", "a pelvic support belt to help ease pain, or crutches to help you get around", "advice on things you can do at home to bring comfort, like warm baths", "advice on coping with the emotional impact of living with pain, which may include relaxation techniques"]
    },
    "rare_cancers": {
        "diagnosis": "Rare cancers",
        "tier": "GREEN",
        "symptoms": ["the type and size of the cancer and whether it has spread (staging and grading)", "your general health", "national treatment guidelines for the cancer (if available)"],
        "reasoning": "Based on NHS Inform guidelines for Rare cancers.",
        "treatment": []
    },
    "rare_conditions": {
        "diagnosis": "Rare conditions",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Rare conditions.",
        "treatment": []
    },
    "raynaud_s_phenomenon": {
        "diagnosis": "Raynaud’s phenomenon",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Raynaud’s phenomenon.",
        "treatment": ["Keep your whole body warm, especially your hands and feet. Wear gloves and warm footwear in cold weather.", "If you smoke, stop. Quitting smoking will improve your circulation, which should help to improve symptoms.", "Exercise regularly, as this helps to improve your circulation and reduce stress levels (see below). For most people, 150 minutes of vigorous exercise a week is recommended. Read more about exercise.", "Try to minimise your stress levels. Regular exercise, eating a healthy diet, and\u00a0relaxation techniques, such as deep breathing or activities such as yoga, can help. You may find it useful to avoid stimulants such as coffee, tea and cola."]
    },
    "reactive_arthritis": {
        "diagnosis": "Reactive arthritis",
        "tier": "GREEN",
        "symptoms": ["joints and tendons \u2013 causing pain, stiffness and swelling, often in the knees, feet, toes, hips and ankles", "eyes \u2013 causing eye pain, redness, sticky discharge, conjunctivitis and sometimes inflammation", "urinary system \u2013 causing pain when peeing, or discharge from the penis or vagina"],
        "reasoning": "Based on NHS Inform guidelines for Reactive arthritis.",
        "treatment": []
    },
    "recurrent_miscarriage": {
        "diagnosis": "Recurrent miscarriage",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Recurrent miscarriage.",
        "treatment": []
    },
    "restless_legs_syndrome": {
        "diagnosis": "Restless legs syndrome",
        "tier": "GREEN",
        "symptoms": ["tingling, burning, itching or throbbing", "a \u201ccreepy-crawly\u201d feeling", "feeling like fizzy water is inside the blood vessels in the legs", "a painful, cramping sensation in the legs, particularly in the calves"],
        "reasoning": "Based on NHS Inform guidelines for Restless legs syndrome.",
        "treatment": ["exercise regularly", "follow a regular bedtime routine", "take time to relax before bed", "stick to the same bed time every day", "get up at the same time every morning", "have a warm bath in the evening"]
    },
    "respiratory_syncytial_virus_rsv": {
        "diagnosis": "Respiratory syncytial virus (RSV)",
        "tier": "GREEN",
        "symptoms": ["a runny nose", "a decreased appetite", "tiredness", "a cough", "shortness of breath", "wheezing", "fever", "croup", "a middle ear infection (otitis media)"],
        "reasoning": "Based on NHS Inform guidelines for Respiratory syncytial virus (RSV).",
        "treatment": ["drinking plenty of fluids", "taking over-the-counter pain relief like paracetamol or ibuprofen"]
    },
    "rheumatoid_arthritis": {
        "diagnosis": "Rheumatoid arthritis",
        "tier": "GREEN",
        "symptoms": ["pain", "swelling", "stiffness and difficulty moving affected joints", "redness", "heat around the joints"],
        "reasoning": "Based on NHS Inform guidelines for Rheumatoid arthritis.",
        "treatment": ["physiotherapy \u2013 helps improve muscle strength, flexibility and fitness", "occupational therapy \u2013 provides training and advice if you need help with everyday tasks or are having difficulty at work", "podiatry \u2013 helps if you have problems with your feet"]
    },
    "ringworm_and_other_fungal_infections": {
        "diagnosis": "Ringworm and other fungal infections",
        "tier": "YELLOW",
        "symptoms": ["a ring-like red or silvery rash on your skin \u2013 your skin will look red and irritated around the ring, but healthy inside", "scaly, itchy and inflamed skin"],
        "reasoning": "Based on NHS Inform guidelines for Ringworm and other fungal infections.",
        "treatment": ["a ring-like red or silvery rash on your skin \u2013 your skin will look red and irritated around the ring, but healthy inside", "scaly, itchy and inflamed skin"]
    },
    "rosacea": {
        "diagnosis": "Rosacea",
        "tier": "GREEN",
        "symptoms": ["a burning or stinging feeling when using skincare products", "dry skin", "swelling \u2013 especially around the eyes", "yellow-orange patches on the skin", "visible blood vessels", "sore eyelids or crusts around your eyelashes", "pink or red bumps on your face \u2013 these may be filled with pus", "thickened skin \u2013 this is usually on the nose and occurs after several years"],
        "reasoning": "Based on NHS Inform guidelines for Rosacea.",
        "treatment": ["prescription creams and gels that you put on the skin", "taking antibiotics"]
    },
    "scabies": {
        "diagnosis": "Scabies",
        "tier": "GREEN",
        "symptoms": ["folds of skin between fingers and toes", "wrists", "underarm area", "waist", "groin", "bottom"],
        "reasoning": "Based on NHS Inform guidelines for Scabies.",
        "treatment": ["steroid cream", "menthol cream or gel", "antihistamines"]
    },
    "scarlet_fever": {
        "diagnosis": "Scarlet fever",
        "tier": "GREEN",
        "symptoms": ["have symptoms of scarlet fever", "do not get better in a week (after seeing a gp)", "have scarlet fever and chickenpox at the same time", "are ill again weeks after scarlet fever got better \u2013 this can be a sign of a complication like rheumatic fever", "are feeling unwell and have been in contact with someone who has scarlet fever"],
        "reasoning": "Based on NHS Inform guidelines for Scarlet fever.",
        "treatment": ["drink plenty of cool fluids", "eat soft foods (if your throat is painful)", "take paracetamol to bring down a high temperature", "use calamine lotion or antihistamines to relieve itching"]
    },
    "schizophrenia": {
        "diagnosis": "Schizophrenia",
        "tier": "GREEN",
        "symptoms": ["hallucinations \u2013 hearing voices or seeing things that other people can\u2019t", "delusions \u2013 unusual beliefs that are not based on reality that other people might find difficult to understand", "muddled thoughts and speech", "a lack of interest in things", "not wanting to look after yourself", "difficulty with day-to-day activities", "wanting to avoid people", "feeling disconnected from your emotions", "worrying that other people may wish you harm", "difficulty concentrating"],
        "reasoning": "Based on NHS Inform guidelines for Schizophrenia.",
        "treatment": ["cognitive behavioural therapy (CBT) \u2013 aims to reduce the impact of voice hearing, unusual beliefs and fear on peoples lives", "family therapy \u2013 informal meetings to help you and your family cope with your condition", "arts therapy \u2013 work with an arts therapist to express your experiences with schizophrenia"]
    },
    "sciatica": {
        "diagnosis": "Sciatica",
        "tier": "GREEN",
        "symptoms": ["lower back pain", "leg pain, often this feels worse than back pain", "a change in sensation in the leg or foot", "muscle spasms\u202fin the back", "a weakness in the leg or foot"],
        "reasoning": "Based on NHS Inform guidelines for Sciatica.",
        "treatment": ["Back problems", "Exercises for back pain", "How to access MSK services", "Mental wellbeing"]
    },
    "about_scoliosis": {
        "diagnosis": "About scoliosis",
        "tier": "GREEN",
        "symptoms": ["a visibly curved spine", "one shoulder being higher than the other", "one shoulder or hip being more prominent than the other", "clothes not hanging properly", "a prominent ribcage", "a difference in leg lengths"],
        "reasoning": "Based on NHS Inform guidelines for About scoliosis.",
        "treatment": ["back and leg pain", "numbness or weakness in the legs"]
    },
    "seasonal_affective_disorder_sad": {
        "diagnosis": "Seasonal affective disorder (SAD)",
        "tier": "GREEN",
        "symptoms": ["low mood", "a loss of pleasure or interest in everyday activities", "irritability", "feelings of despair, guilt and worthlessness", "low self-esteem", "indecisiveness", "tearfulness", "stress", "anxiety", "a reduced sex drive"],
        "reasoning": "Based on NHS Inform guidelines for Seasonal affective disorder (SAD).",
        "treatment": ["made by a fully certified manufacturer", "medically proven to treat SAD"]
    },
    "septic_shock": {
        "diagnosis": "Septic shock",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Septic shock.",
        "treatment": []
    },
    "severe_head_injury": {
        "diagnosis": "Severe head injury",
        "tier": "RED",
        "symptoms": ["is unresponsive to their name or a gentle chest rub", "cannot stay awake", "has had a seizure (fit)", "has fallen from a height like 5 or more stairs", "is having problems with their senses, like hearing loss or double vision", "has numbness or weakness in any part of their body", "is struggling to walk, balance, speak, write, or understand other people", "hit their head with force, like being hit by a car", "has a head wound with something inside it, like glass", "has signs of damage to their skull, like a dent in their head"],
        "reasoning": "Based on NHS Inform guidelines for Severe head injury.",
        "treatment": []
    },
    "shigella": {
        "diagnosis": "Shigella",
        "tier": "GREEN",
        "symptoms": ["watery diarrhoea \u2013 sometimes containing blood, mucus or pus in severe cases", "feeling sick or being sick", "abdominal pain", "high temperature (fever) over 38\u00b0c (100.4\u00b0f)", "feeling down or depressed"],
        "reasoning": "Based on NHS Inform guidelines for Shigella.",
        "treatment": ["anal sex", "oral sex which involves licking the anus (rimming)", "fisting", "touching a condom or sex toy that\u2019s been used for anal sex", "having oral sex after anal sex"]
    },
    "shingles": {
        "diagnosis": "Shingles",
        "tier": "GREEN",
        "symptoms": ["a\u00a0headache", "burning, tingling, numbness or itchiness of the skin in the affected area", "a feeling of being generally unwell", "a high temperature (fever)"],
        "reasoning": "Based on NHS Inform guidelines for Shingles.",
        "treatment": ["paracetamol", "non-steroidal anti-inflammatory drugs (NSAIDs)\u00a0like\u00a0ibuprofen", "opioids \u2013 used for more severe pain", "antidepressants\u00a0\u2013 used for severe pain", "anticonvulsants \u2013 used for severe pain"]
    },
    "sickle_cell_disease": {
        "diagnosis": "Sickle cell disease",
        "tier": "GREEN",
        "symptoms": ["high temperature (a fever) going to 38c (100.4f) or higher", "difficulty breathing", "drowsiness, confusion, or slurred speech", "a severe headache, stiff neck, or dizziness", "skin or lips that are very pale", "fits (seizures)", "serious pain that isn\u2019t responding to treatments at home", "sudden swelling in the tummy", "priapism \u2013 a painful erection lasting two hours or more", "weakness on one or both sides of your body"],
        "reasoning": "Based on NHS Inform guidelines for Sickle cell disease.",
        "treatment": []
    },
    "sinusitis": {
        "diagnosis": "Sinusitis",
        "tier": "GREEN",
        "symptoms": ["a green or yellow discharge from your nose", "a blocked nose", "pain and tenderness around your cheeks, eyes or forehead", "a high temperature (fever) of 38\u00b0c (100.4\u00b0f) or more", "toothache", "a reduced sense of smell", "bad breath (halitosis)"],
        "reasoning": "Based on NHS Inform guidelines for Sinusitis.",
        "treatment": ["get plenty of rest", "drink plenty of fluids", "take over-the-counter painkillers such as paracetamol or ibuprofen (do not give aspirin to children under 16)", "use nasal decongestants \u2013 these shouldn\u2019t be used for more than a week, as this might make things worse", "hold warm packs to your face", "clean your nose with a salt water solution \u2013 you can make yourself or buy sachets from a pharmacy"]
    },
    "sjogren_s_syndrome": {
        "diagnosis": "Sjogren’s syndrome",
        "tier": "GREEN",
        "symptoms": ["tooth decay\u00a0and gum disease", "dry\u00a0cough", "difficulty swallowing and chewing", "hoarse voice", "difficulty speaking", "swollen salivary glands (located between your jaw and ears)", "repeated fungal infections in the mouth (oral thrush) \u2013 symptoms of which can include a coated or white tongue"],
        "reasoning": "Based on NHS Inform guidelines for Sjogren’s syndrome.",
        "treatment": []
    },
    "skin_cancer_melanoma": {
        "diagnosis": "Skin cancer (melanoma)",
        "tier": "GREEN",
        "symptoms": ["desmoplastic melanoma", "amelanotic melanoma", "spitzoid melanoma", "malignant blue naevus"],
        "reasoning": "Based on NHS Inform guidelines for Skin cancer (melanoma).",
        "treatment": ["Stage 2 melanoma \u2013 you may have a type of immunotherapy drug called pembrolizumab.", "Stage 3 melanoma \u2013 if tests show a BRAF gene mutation in the melanoma cells, you may have a combination of 2 targeted therapy drugs. These drugs are called dabrafenib and trametinib. If tests do not find a BRAF gene mutation, you may have one or, sometimes, a combination of immunotherapy drugs. These drugs are called Ipilimumab, pembrolizumab and nivolumab."]
    },
    "skin_cancer": {
        "diagnosis": "Skin cancer",
        "tier": "GREEN",
        "symptoms": ["a new or changing mole", "any other unusual or unexplained skin changes", "an itch or sore that won\u2019t go away"],
        "reasoning": "Based on NHS Inform guidelines for Skin cancer.",
        "treatment": ["feel better about your appearance", "manage changes to your body", "improve your confidence"]
    },
    "skin_light_sensitivity_photosensitivity": {
        "diagnosis": "Skin light sensitivity (photosensitivity)",
        "tier": "GREEN",
        "symptoms": ["skin rash", "skin pain", "itching", "a burning or heat sensation on the skin", "blistering or fragile skin", "sunburn that happens very easily"],
        "reasoning": "Based on NHS Inform guidelines for Skin light sensitivity (photosensitivity).",
        "treatment": ["Managing skin light sensitivity (photosensitivity)"]
    },
    "skin_rashes_in_children": {
        "diagnosis": "Skin rashes in children",
        "tier": "GREEN",
        "symptoms": ["red", "painful", "swollen", "hot"],
        "reasoning": "Based on NHS Inform guidelines for Skin rashes in children.",
        "treatment": ["paracetamol\u00a0to help bring down a fever", "calamine lotion and cooling gels to ease itching"]
    },
    "slapped_cheek_syndrome": {
        "diagnosis": "Slapped cheek syndrome",
        "tier": "GREEN",
        "symptoms": ["a slightly high temperature (fever) of around 38\u00b0c (100.4\u00b0f)", "a runny nose", "a sore throat", "a headache", "an upset stomach", "feeling generally unwell"],
        "reasoning": "Based on NHS Inform guidelines for Slapped cheek syndrome.",
        "treatment": []
    },
    "slipped_upper_femoral_epiphysis_sufe_in_children_and_young_people": {
        "diagnosis": "Slipped upper femoral epiphysis (SUFE) in children and young people",
        "tier": "GREEN",
        "symptoms": ["pain in the hip, groin, thigh or knee", "limping when walking", "the affected leg may look shorter", "the affected leg may be held in an unusual resting position", "reduced movement at the hip"],
        "reasoning": "Based on NHS Inform guidelines for Slipped upper femoral epiphysis (SUFE) in children and young people.",
        "treatment": ["Hip problems in children and young people", "Perthes' disease", "Snapping hip in children and young people", "Traction apophysitis of the hip in children and young people"]
    },
    "snapping_hip_in_children_and_young_people": {
        "diagnosis": "Snapping hip in children and young people",
        "tier": "GREEN",
        "symptoms": ["like their hip is dislocating or coming out even though it\u2019s not", "pain at the hip and the knee", "their leg feeling weaker", "swelling in the area of the clicking"],
        "reasoning": "Based on NHS Inform guidelines for Snapping hip in children and young people.",
        "treatment": ["Hip problems in children and young people", "Perthes' disease", "Slipped upper femoral epiphysis (SUFE) in children and young people", "Traction apophysitis of the hip in children and young people"]
    },
    "social_anxiety_disorder": {
        "diagnosis": "Social anxiety disorder",
        "tier": "GREEN",
        "symptoms": ["worry about everyday activities like meeting new people, starting conversations, speaking on the phone, working or shopping", "avoid or worry a lot about social activities like group conversations or parties", "worry about doing something embarrassing like blushing, sweating or appearing incompetent", "worry that other people are looking at you and noticing what you\u2019re doing", "worry about eating or drinking in public", "fear being criticised, avoid eye contact or have low self esteem", "feel sick, sweaty or tremble during social situations"],
        "reasoning": "Based on NHS Inform guidelines for Social anxiety disorder.",
        "treatment": ["talking therapies \u2013 like cognitive behavioural therapy (CBT)", "medication \u2013 like a type of antidepressant called selective serotonin reuptake inhibitors (SSRIs)"]
    },
    "soft_tissue_sarcomas": {
        "diagnosis": "Soft tissue sarcomas",
        "tier": "GREEN",
        "symptoms": ["getting bigger", "bigger than 5cm (2in) \u2013 about the size of a golf ball", "painful or tender"],
        "reasoning": "Based on NHS Inform guidelines for Soft tissue sarcomas.",
        "treatment": ["the type of sarcoma", "where it started", "the stage and grade of the sarcoma", "your general health"]
    },
    "sore_throat": {
        "diagnosis": "Sore throat",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Sore throat.",
        "treatment": ["take ibuprofen or paracetamol \u2013 paracetamol is better for children and for people who can\u2019t take ibuprofen (children under 16 should never take aspirin)", "drink plenty of cool or warm fluids, and avoid very hot drinks", "eat cool, soft foods", "avoid smoking and smoky places", "suck lozenges, hard sweets, ice cubes or ice lollies \u2013 but don\u2019t give young children anything small and hard to suck because of the risk of choking", "gargle with a homemade mouthwash of warm, salty water (children should not try this)"]
    },
    "spina_bifida": {
        "diagnosis": "Spina bifida",
        "tier": "GREEN",
        "symptoms": ["weakness or complete loss of movement of lower limbs", "sensation changes in the legs and/or torso", "curvature of the spine due to muscle weakness (scoliosis)", "urinary incontinence", "urinary retention", "repeat or frequent urinary tract infections", "kidney problems", "bowel incontinence, leading to constipation and/or diarrhoea", "hydrocephalus (excess fluid on the brain)", "skin problems"],
        "reasoning": "Based on NHS Inform guidelines for Spina bifida.",
        "treatment": []
    },
    "spinal_stenosis": {
        "diagnosis": "Spinal stenosis",
        "tier": "GREEN",
        "symptoms": ["pain", "aching", "cramping", "heaviness and or weakness", "tingling", "pins and needles", "numbness"],
        "reasoning": "Based on NHS Inform guidelines for Spinal stenosis.",
        "treatment": ["exercise can reduce nerve irritation and make the nerve more resilient to movement. It will not change the spinal tunnel narrowing itself", "exercise may also help with general function, muscle strength and balance", "physiotherapy can also be beneficial, you may be referred to this or their may be an option to self-refer in your area."]
    },
    "spleen_problems_and_spleen_removal": {
        "diagnosis": "Spleen problems and spleen removal",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Spleen problems and spleen removal.",
        "treatment": []
    },
    "stillbirth": {
        "diagnosis": "Stillbirth",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Stillbirth.",
        "treatment": []
    },
    "stomach_ache_and_abdominal_pain": {
        "diagnosis": "Stomach ache and abdominal pain",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Stomach ache and abdominal pain.",
        "treatment": ["what\u2019s causing your stomach ache", "treatments that might help", "medicines to help relieve symptoms of constipation and indigestion"]
    },
    "stomach_cancer": {
        "diagnosis": "Stomach cancer",
        "tier": "GREEN",
        "symptoms": ["heartburn or indigestion that does not go away", "pain or discomfort in tummy (abdomen)", "loss of appetite"],
        "reasoning": "Based on NHS Inform guidelines for Stomach cancer.",
        "treatment": ["the stage of the cancer", "your general health", "your personal choices"]
    },
    "stomach_ulcer": {
        "diagnosis": "Stomach ulcer",
        "tier": "GREEN",
        "symptoms": ["indigestion", "heartburn", "nausea (feeling sick)"],
        "reasoning": "Based on NHS Inform guidelines for Stomach ulcer.",
        "treatment": ["a course of antibiotics", "a medication called a proton pump inhibitor (PPI)"]
    },
    "streptococcus_a_strep_a": {
        "diagnosis": "Streptococcus A (strep A)",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Streptococcus A (strep A).",
        "treatment": []
    },
    "mental_wellbeing": {
        "diagnosis": "Mental wellbeing",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Mental wellbeing.",
        "treatment": ["About NHS inform", "Editorial policy", "How this information was written"]
    },
    "stroke": {
        "diagnosis": "Stroke",
        "tier": "GREEN",
        "symptoms": ["face \u2013 the face might drop on one side, the person may not be able to smile or their mouth may have dropped, and their eyelid may droop", "arms \u2013 the person may not be able to lift both arms and keep them there because of arm weakness or numbness in one arm or they might have weakness in one leg", "speech \u2013 they might slur their speech or it might be garbled, or the person may not be able to talk at all despite appearing to be awake", "time \u2013 it\u2019s time to\u00a0phone 999 immediately if you see any of these signs or symptoms"],
        "reasoning": "Based on NHS Inform guidelines for Stroke.",
        "treatment": []
    },
    "subacromial_pain_syndrome": {
        "diagnosis": "Subacromial pain syndrome",
        "tier": "GREEN",
        "symptoms": ["shoulder problems"],
        "reasoning": "Based on NHS Inform guidelines for Subacromial pain syndrome.",
        "treatment": ["Shoulder problems"]
    },
    "sudden_arrhythmic_death_syndrome_sads": {
        "diagnosis": "Sudden arrhythmic death syndrome (SADS)",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Sudden arrhythmic death syndrome (SADS).",
        "treatment": []
    },
    "sleeping_safely": {
        "diagnosis": "Sleeping safely",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Sleeping safely.",
        "treatment": []
    },
    "suicide": {
        "diagnosis": "Suicide",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Suicide.",
        "treatment": []
    },
    "sunbed_and_tanning_safety": {
        "diagnosis": "Sunbed and tanning safety",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Sunbed and tanning safety.",
        "treatment": []
    },
    "sunburn": {
        "diagnosis": "Sunburn",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Sunburn.",
        "treatment": ["blistering or swelling of the skin (oedema)", "chills", "a high temperature (fever) of 38C (100.4F) or above,\u00a0or 37.5C (99.5F) or above in children under five", "dizziness,\u00a0headaches\u00a0and feeling sick (symptoms of heat exhaustion)"]
    },
    "supraventricular_tachycardia": {
        "diagnosis": "Supraventricular tachycardia",
        "tier": "GREEN",
        "symptoms": ["chest pain", "dizziness", "light-headedness", "fatigue (tiredness)", "breathlessness"],
        "reasoning": "Based on NHS Inform guidelines for Supraventricular tachycardia.",
        "treatment": ["medication, like\u00a0beta blockers\u00a0and other anti-arrhythmic drugs", "electric shock treatment (DC cardioversion) in an urgent case", "radiofrequency ablation"]
    },
    "swollen_glands": {
        "diagnosis": "Swollen glands",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Swollen glands.",
        "treatment": []
    },
    "syphilis": {
        "diagnosis": "Syphilis",
        "tier": "GREEN",
        "symptoms": ["penis", "vagina", "anus", "rectum", "tongue", "lips"],
        "reasoning": "Based on NHS Inform guidelines for Syphilis.",
        "treatment": ["miscarriage", "premature birth", "stillbirth"]
    },
    "self_harm": {
        "diagnosis": "Self-harm",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Self-harm.",
        "treatment": ["a counsellor \u2013 somebody who is trained in talking therapies", "a psychiatrist \u2013 a doctor with further training in treating mental health conditions", "a psychologist \u2013 a health professional who specialises in managing mental health conditions"]
    },
    "talking_to_children_and_teenagers_about_cancer": {
        "diagnosis": "Talking to children and teenagers about cancer",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Talking to children and teenagers about cancer.",
        "treatment": []
    },
    "tennis_elbow": {
        "diagnosis": "Tennis elbow",
        "tier": "GREEN",
        "symptoms": ["difficulty with gripping.", "difficulty with twisting movements such as opening jars.", "restriction in movement at the elbow.", "tenderness when touching the area."],
        "reasoning": "Based on NHS Inform guidelines for Tennis elbow.",
        "treatment": ["changing how you grip or lift an object.", "reducing the weight you are carrying.", "taking regular breaks while doing aggravating activities."]
    },
    "testicular_cancer": {
        "diagnosis": "Testicular cancer",
        "tier": "GREEN",
        "symptoms": ["pain in the back or lower abdomen (tummy)", "weight loss", "a cough", "breathlessness", "feelings of being unwell", "a lump in the neck"],
        "reasoning": "Based on NHS Inform guidelines for Testicular cancer.",
        "treatment": ["regular chest x-rays", "occasionally CT or ultrasound scans"]
    },
    "testicular_lumps_and_swellings": {
        "diagnosis": "Testicular lumps and swellings",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Testicular lumps and swellings.",
        "treatment": ["Cancer Research UK: Testicular cancer", "British Association of Urological Surgeons: Testicular lumps"]
    },
    "thirst": {
        "diagnosis": "Thirst",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Thirst.",
        "treatment": []
    },
    "threadworms": {
        "diagnosis": "Threadworms",
        "tier": "GREEN",
        "symptoms": ["extreme itching around the anus or vagina, particularly at night", "irritability and wakening up during the night"],
        "reasoning": "Based on NHS Inform guidelines for Threadworms.",
        "treatment": ["wash hands and scrub under fingernails \u2013 particularly before eating, after using the toilet or after changing nappies", "encourage children to wash their hands regularly", "shower every morning", "rinse toothbrushes before using them", "keep fingernails short", "wash sleepwear, sheets, towels and soft toys (at a hot temperature) every day for several days after treatment", "disinfect kitchen and bathroom surfaces, using hot water", "vacuum and dust with a damp cloth"]
    },
    "thrush": {
        "diagnosis": "Thrush",
        "tier": "GREEN",
        "symptoms": ["white vaginal discharge (often like cottage cheese), which does not usually smell", "itching and irritation around the vagina", "soreness and stinging during sex or when you pee"],
        "reasoning": "Based on NHS Inform guidelines for Thrush.",
        "treatment": ["white vaginal discharge (often like cottage cheese), which does not usually smell", "itching and irritation around the vagina", "soreness and stinging during sex or when you pee"]
    },
    "thumb_fracture": {
        "diagnosis": "Thumb fracture",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Thumb fracture.",
        "treatment": []
    },
    "thyroid_cancer": {
        "diagnosis": "Thyroid cancer",
        "tier": "GREEN",
        "symptoms": ["a hoarse voice that has no obvious cause and does not go away after a few weeks", "difficulty swallowing \u2013 caused by a thyroid tumour pressing on the gullet (oesophagus)", "difficulty breathing \u2013 caused by a thyroid tumour pressing on the windpipe (trachea)", "pain in the front of the neck"],
        "reasoning": "Based on NHS Inform guidelines for Thyroid cancer.",
        "treatment": ["Call the Macmillan Support Line on 0808 808 00 00.", "Chat online to Macmillan Cancer Support specialists.", "Visit our thyroid cancer forum to talk with people who have been affected by thyroid cancer, share your experience, and ask an expert your questions."]
    },
    "tick_bites": {
        "diagnosis": "Tick bites",
        "tier": "GREEN",
        "symptoms": ["swelling", "itchiness", "blistering", "bruising"],
        "reasoning": "Based on NHS Inform guidelines for Tick bites.",
        "treatment": ["stay on paths and avoid long grass when walking outdoors", "wear a long-sleeved shirt and trousers tucked into your socks when walking outdoors", "wear light-coloured fabrics for walking \u2013 this may help you to spot a tick on your clothing", "use insect repellent on exposed skin", "check your skin and clothing for ticks after being outdoors", "check your children\u2019s skin for ticks \u2013 especially the head and neck areas, including their scalp", "check that pets do not bring ticks into your home in their fur"]
    },
    "tinnitus": {
        "diagnosis": "Tinnitus",
        "tier": "GREEN",
        "symptoms": ["buzzing", "humming", "grinding", "hissing", "whistling", "music or singing", "noises that beat in time with your pulse"],
        "reasoning": "Based on NHS Inform guidelines for Tinnitus.",
        "treatment": []
    },
    "tonsillitis": {
        "diagnosis": "Tonsillitis",
        "tier": "GREEN",
        "symptoms": ["a sore throat", "pain when swallowing", "earache", "high temperature (fever) over 38\u00b0c (100.4\u00b0f)", "coughing", "headache", "feeling sick", "feeling tired", "swollen, painful lymph glands in your neck", "white pus-filled spots on the tonsils"],
        "reasoning": "Based on NHS Inform guidelines for Tonsillitis.",
        "treatment": ["a sore throat", "pain when swallowing", "earache", "high temperature (fever) over 38\u00b0C (100.4\u00b0F)", "coughing", "headache", "feeling sick", "feeling tired"]
    },
    "tooth_decay": {
        "diagnosis": "Tooth decay",
        "tier": "GREEN",
        "symptoms": ["toothache \u2013 either continuous pain keeping you awake or occasional sharp pain without an obvious cause", "tooth sensitivity \u2013 you may feel tenderness or pain when eating or drinking something hot, cold or sweet", "grey, brown or black spots appearing on your teeth", "bad breath", "an unpleasant taste in your mouth"],
        "reasoning": "Based on NHS Inform guidelines for Tooth decay.",
        "treatment": ["visit your dentist regularly \u2013 your dentist will decide how often they need to see you based on the condition of your mouth, teeth and gums", "cut down on sugary food and drinks, particularly between meals or within an hour of going to bed \u2013 some medications can also contain sugar, so it\u2019s best to look for sugar-free alternatives where possible", "look after your teeth and gums \u2013 brushing your teeth properly with a fluoride toothpaste twice a day, using interdental brushes or floss daily", "avoid smoking or drinking alcohol excessively \u2013 tobacco can interfere with saliva production, which helps to keep your teeth clean, and alcohol can contribute to the erosion of tooth enamel", "see your dentist or GP if you have a persistently dry mouth \u2013 this may be caused by certain medicines, treatment or medical conditions"]
    },
    "toothache": {
        "diagnosis": "Toothache",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Toothache.",
        "treatment": []
    },
    "tourette_s_syndrome": {
        "diagnosis": "Tourette’s syndrome",
        "tier": "GREEN",
        "symptoms": ["eye blinking", "neck and head jerks", "arm and leg movements", "pinching", "kicking", "hitting", "falling to the ground"],
        "reasoning": "Based on NHS Inform guidelines for Tourette’s syndrome.",
        "treatment": []
    },
    "transient_ischaemic_attack_tia": {
        "diagnosis": "Transient ischaemic attack (TIA)",
        "tier": "GREEN",
        "symptoms": ["face \u2013 the face might drop on one side, the person may not be able to smile or their mouth may have dropped, and their eyelid may droop", "arms \u2013 the person may not be able to lift both arms and keep them there because of arm weakness or numbness in one arm or they might have weakness in one leg", "speech \u2013 they might slur their speech or it might be garbled, or the person may not be able to talk at all despite appearing to be awake", "time \u2013 it\u2019s time to phone 999 immediately if you see any of these signs or symptoms"],
        "reasoning": "Based on NHS Inform guidelines for Transient ischaemic attack (TIA).",
        "treatment": []
    },
    "transverse_myelitis": {
        "diagnosis": "Transverse myelitis",
        "tier": "GREEN",
        "symptoms": ["muscle weakness in the legs, and sometimes the arms", "mobility problems", "unusual sensations and numbness", "bladder problems", "bowel problems", "sexual problems", "pain"],
        "reasoning": "Based on NHS Inform guidelines for Transverse myelitis.",
        "treatment": ["an exercise programme\u00a0supervised by a physiotherapist", "mobility aids, such as a walking stick, or a wheelchair", "home adaptations such as stair lifts or railings"]
    },
    "trichomonas_infection": {
        "diagnosis": "Trichomonas infection",
        "tier": "YELLOW",
        "symptoms": ["a yellow or green discharge from the vagina or penis, which can sometimes have an unpleasant smell", "genital itching and soreness", "pain or a burning sensation when peeing"],
        "reasoning": "Based on NHS Inform guidelines for Trichomonas infection.",
        "treatment": []
    },
    "trigeminal_neuralgia": {
        "diagnosis": "Trigeminal neuralgia",
        "tier": "GREEN",
        "symptoms": ["talking", "smiling", "chewing", "brushing your teeth", "washing your face", "a light touch", "shaving or putting on make-up", "swallowing", "kissing", "a cool breeze or air conditioning"],
        "reasoning": "Based on NHS Inform guidelines for Trigeminal neuralgia.",
        "treatment": []
    },
    "trigger_thumb_or_trigger_finger_in_children_and_young_people": {
        "diagnosis": "Trigger thumb or trigger finger in children and young people",
        "tier": "GREEN",
        "symptoms": ["stiffness in the affected finger or thumb", "a finger or thumb that gets stuck in either a bent or straight position"],
        "reasoning": "Based on NHS Inform guidelines for Trigger thumb or trigger finger in children and young people.",
        "treatment": ["your child is complaining of significant pain", "they are over the age of 3 and it\u2019s restricting their ability to use their hands as normal"]
    },
    "tuberculosis_tb": {
        "diagnosis": "Tuberculosis (TB)",
        "tier": "GREEN",
        "symptoms": ["a persistent cough that lasts more than three weeks and usually brings up phlegm, which may be bloody", "weight loss", "night sweats", "high temperature (fever)", "tiredness and fatigue", "loss of appetite", "new swellings that haven\u2019t gone away after a few weeks"],
        "reasoning": "Based on NHS Inform guidelines for Tuberculosis (TB).",
        "treatment": ["being sick", "yellowing of your skin and whites of your eyes (jaundice)", "an unexplained high temperature (fever)", "tingling or numbness in your hands or feet", "a rash or itchy skin", "changes to your vision, such as blurred vision"]
    },
    "type_1_diabetes": {
        "diagnosis": "Type 1 diabetes",
        "tier": "GREEN",
        "symptoms": ["feel very thirsty", "pee more often than usual, particularly at night", "feel very tired all the time", "lose weight and muscle bulk", "get persistent infections like thrush", "develop blurred vision caused by the lens of your eye changing shape"],
        "reasoning": "Based on NHS Inform guidelines for Type 1 diabetes.",
        "treatment": ["blood glucose level", "how much exercise you do"]
    },
    "type_2_diabetes": {
        "diagnosis": "Type 2 diabetes",
        "tier": "GREEN",
        "symptoms": ["feeling very thirsty", "needing to pee more than usual, especially at night", "feeling very tired", "losing weight without trying", "cuts or ulcers that take a long time to heal", "blurred vision", "repeatedly getting thrush"],
        "reasoning": "Based on NHS Inform guidelines for Type 2 diabetes.",
        "treatment": []
    },
    "ulcerative_colitis": {
        "diagnosis": "Ulcerative colitis",
        "tier": "GREEN",
        "symptoms": ["recurring\u00a0diarrhoea, which may contain blood, mucus or pus", "abdominal pain", "needing to poo often"],
        "reasoning": "Based on NHS Inform guidelines for Ulcerative colitis.",
        "treatment": ["aminosalicylates (ASAs) \u2013 often the first treatment option, used to get and keep inflammation under control and can be given rectally as well as orally", "corticosteroids\u00a0\u2013 used to get inflammation under control quickly, but not suitable for long-term use"]
    },
    "underactive_thyroid": {
        "diagnosis": "Underactive thyroid",
        "tier": "GREEN",
        "symptoms": ["tiredness", "being sensitive to cold", "weight gain", "constipation", "depression", "slow movements and thoughts", "muscle aches and weakness", "muscle cramps", "dry and scaly skin", "brittle hair and nails"],
        "reasoning": "Based on NHS Inform guidelines for Underactive thyroid.",
        "treatment": ["lithium \u2013 a medication sometimes used to treat certain mental health conditions, including depression\u00a0and\u00a0bipolar disorder", "amiodarone \u2013 a medication sometimes used to treat irregular heartbeats (arrhythmias)", "interferons \u2013 a class of medication sometimes used to treat certain types of\u00a0cancer and hepatitis C"]
    },
    "urinary_incontinence": {
        "diagnosis": "Urinary incontinence",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Urinary incontinence.",
        "treatment": ["treating the underlying cause, if urinary incontinence is caused by another condition", "lifestyle changes \u2013 such as reducing your caffeine intake, changing how much you drink, and maintaining a healthy weight", "pelvic floor muscle training \u2013 your healthcare professional will explain how to do these exercises", "bladder training \u2013 techniques to increase the length of time between feeling the need to go to the toilet and peeing"]
    },
    "urinary_incontinence_in_women": {
        "diagnosis": "Urinary incontinence in women",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Urinary incontinence in women.",
        "treatment": ["reducing your caffeine intake (caffeine can increase the amount of urine your body produces \u2013 it\u2019s found in tea, coffee and some fizzy drinks like cola)", "changing how much you drink (drinking too much or too little can make incontinence worse)", "maintaining a\u00a0healthy weight"]
    },
    "urinary_tract_infection_uti": {
        "diagnosis": "Urinary tract infection (UTI)",
        "tier": "YELLOW",
        "symptoms": ["a need to pee more often than usual", "pain or discomfort when peeing", "sudden urges to pee", "feeling as though you\u2019re unable to empty your bladder fully", "pain low down in your tummy", "urine that\u2019s cloudy, foul-smelling or contains blood", "feeling generally unwell, achy and tired"],
        "reasoning": "Based on NHS Inform guidelines for Urinary tract infection (UTI).",
        "treatment": ["a need to pee more often than usual", "pain or discomfort when peeing", "sudden urges to pee", "feeling as though you\u2019re unable to empty your bladder fully", "pain low down in your tummy", "urine that\u2019s cloudy, foul-smelling or contains blood", "feeling generally unwell, achy and tired"]
    },
    "urinary_tract_infection_uti_in_children": {
        "diagnosis": "Urinary tract infection (UTI) in children",
        "tier": "YELLOW",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Urinary tract infection (UTI) in children.",
        "treatment": ["encourage girls to wipe their bottom from front to back", "make sure children are well hydrated and go to the toilet regularly", "avoid nylon and other synthetic underwear \u2013 pick loose, cotton underwear", "avoid scented soaps or bubble baths \u2013 these can increase the risk of developing a UTI"]
    },
    "vaginal_cancer": {
        "diagnosis": "Vaginal cancer",
        "tier": "GREEN",
        "symptoms": ["bleeding after the menopause, between periods or after sex", "blood-stained vaginal discharge", "pain when peeing (passing urine), needing to pee often, or blood in your pee", "pain in the pelvic (lower tummy) area", "constipation", "feeling you need to poo, even though you have just been (tenesmus)", "swelling in your legs."],
        "reasoning": "Based on NHS Inform guidelines for Vaginal cancer.",
        "treatment": ["the stage of the cancer", "where it is in the vagina", "your general health."]
    },
    "vaginal_discharge": {
        "diagnosis": "Vaginal discharge",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Vaginal discharge.",
        "treatment": ["vaginal infections such as\u00a0bacterial vaginosis (BV)\u00a0and\u00a0thrush", "all STIs"]
    },
    "varicose_eczema": {
        "diagnosis": "Varicose eczema",
        "tier": "GREEN",
        "symptoms": ["itchy", "red and\u00a0swollen", "dry and\u00a0flaky", "scaly or crusty"],
        "reasoning": "Based on NHS Inform guidelines for Varicose eczema.",
        "treatment": ["try to avoid injuring your skin \u2013\u00a0injuries to your skin could lead to an ulcer\u00a0developing", "raise your legs when you are resting \u2013\u00a0for example, by propping up your feet on some pillows\u00a0(ideally so that they are above the level of your heart), as this can help reduce swelling", "keep physically active\u00a0\u2013 this will improve your circulation and\u00a0help you maintain a healthy weight"]
    },
    "varicose_veins": {
        "diagnosis": "Varicose veins",
        "tier": "GREEN",
        "symptoms": ["pain, aching or a feeling of heaviness", "swollen feet and ankles", "burning or throbbing in your legs", "muscle cramp in your legs, particularly at night", "dry, itchy and thin skin over the affected vein"],
        "reasoning": "Based on NHS Inform guidelines for Varicose veins.",
        "treatment": ["symptoms like pain, heaviness, swollen legs, itching or skin changes", "any complications, like ulcers on your legs"]
    },
    "vascular_dementia": {
        "diagnosis": "Vascular dementia",
        "tier": "GREEN",
        "symptoms": ["slowness of thought", "difficulty with planning and understanding", "problems with concentration", "changes to your mood, personality or behaviour", "feeling disoriented and confused", "difficulty walking and keeping balance", "symptoms of alzheimer\u2019s disease, like problems with memory and language"],
        "reasoning": "Based on NHS Inform guidelines for Vascular dementia.",
        "treatment": ["what support you or your carer need for you to remain as independent as possible", "whether there are any changes that need to be made to your home to make it easier to live in", "whether you need any financial assistance"]
    },
    "venous_leg_ulcer": {
        "diagnosis": "Venous leg ulcer",
        "tier": "GREEN",
        "symptoms": ["swollen ankles (oedema)", "discolouration and darkening of the skin around the ulcer", "hardened skin around the ulcer", "a heavy feeling in your legs", "aching or swelling in your legs", "red, flaky, scaly and itchy skin on your legs (varicose eczema)", "swollen and enlarged veins on your legs (varicose veins)"],
        "reasoning": "Based on NHS Inform guidelines for Venous leg ulcer.",
        "treatment": ["you get severe pain at the front of your ankle", "you get severe pain on the top of your foot", "your toes become blue and swollen"]
    },
    "vertigo": {
        "diagnosis": "Vertigo",
        "tier": "GREEN",
        "symptoms": ["lie still in a quiet, dark room to reduce the spinning feeling", "move your head as able", "sit down straight away when you feel dizzy", "turn on the lights if you get up at night", "use a walking stick if you\u2019re at risk of falling", "use an extra pillow the first couple of nights if you\u2019re unable to sleep lying flat", "get up slowly when getting out of bed and sit on the edge of the bed for a minute or so before standing", "try to relax and avoid stress \u2013 anxiety can make vertigo worse", "listen to your body, if able you should continue with some of your normal activities", "try to return to moving naturally, as this will help you recover"],
        "reasoning": "Based on NHS Inform guidelines for Vertigo.",
        "treatment": ["lie still in a quiet, dark room to reduce the spinning feeling", "move your head as able", "sit down straight away when you feel dizzy", "turn on the lights if you get up at night", "use a walking stick if you\u2019re at risk of falling", "use an extra pillow the first couple of nights if you\u2019re unable to sleep lying flat", "get up slowly when getting out of bed and sit on the edge of the bed for a minute or so before standing", "try to relax and avoid stress \u2013 anxiety can make vertigo worse"]
    },
    "vitamin_b12_or_folate_deficiency_anaemia": {
        "diagnosis": "Vitamin B12 or folate deficiency anaemia",
        "tier": "GREEN",
        "symptoms": ["extreme tiredness", "a lack of energy", "pins and needles (paraesthesia)", "a sore and red tongue", "mouth ulcers", "muscle weakness", "disturbed vision", "psychological problems, which may include depression\u00a0and\u00a0confusion", "problems with\u00a0memory, understanding and judgement"],
        "reasoning": "Based on NHS Inform guidelines for Vitamin B12 or folate deficiency anaemia.",
        "treatment": []
    },
    "vomiting_in_adults": {
        "diagnosis": "Vomiting in adults",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Vomiting in adults.",
        "treatment": ["sudden, severe abdominal (tummy) pain", "severe chest pain", "blood in your vomit or what looks like coffee granules", "have green or yellow-green vomit", "a stiff neck and high temperature (fever)", "a sudden, severe headache that\u2019s unlike any headache you\u2019ve had before", "swallowed something poisonous, or think you may have", "have a stiff neck and pain when looking at bright lights"]
    },
    "vomiting_in_children_and_babies": {
        "diagnosis": "Vomiting in children and babies",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Vomiting in children and babies.",
        "treatment": []
    },
    "vulval_cancer": {
        "diagnosis": "Vulval cancer",
        "tier": "GREEN",
        "symptoms": ["there is a narrowing of the vagina due to lichen sclerosus (ls)", "the vulva is too sore for a full examination."],
        "reasoning": "Based on NHS Inform guidelines for Vulval cancer.",
        "treatment": ["phone the Macmillan Support Line on 0808 808 00 00", "chat to their specialists online", "visit their vulval cancer forum to talk with people who have been affected by vulval cancer, share your experience, and ask an expert your questions"]
    },
    "warts_and_verrucas": {
        "diagnosis": "Warts and verrucas",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Warts and verrucas.",
        "treatment": ["painful", "in an awkward position", "causing you distress or embarrassment"]
    },
    "whiplash": {
        "diagnosis": "Whiplash",
        "tier": "GREEN",
        "symptoms": ["neck pain that may spread to the head, arm and upper back", "neck stiffness and difficulty moving your head"],
        "reasoning": "Based on NHS Inform guidelines for Whiplash.",
        "treatment": ["gently moving your neck and shoulders, immediately after your injury", "avoiding prolonged static postures", "try to continue doing everyday activities \u2013 it might hurt a little but it will speed up your recovery", "early return to your normal hobbies are encouraged"]
    },
    "wolff_parkinson_white_syndrome": {
        "diagnosis": "Wolff-Parkinson-White syndrome",
        "tier": "GREEN",
        "symptoms": ["palpitations (a pounding or fluttering feeling in your chest or neck)", "feeling light-headed, dizzy or faint", "fainting", "shortness of breath", "feeling anxious", "sweating", "chest pain or discomfort"],
        "reasoning": "Based on NHS Inform guidelines for Wolff-Parkinson-White syndrome.",
        "treatment": ["The British Heart Foundation", "Chest, Heart & Stroke Scotland"]
    },
    "womb_uterus_cancer": {
        "diagnosis": "Womb (uterus) cancer",
        "tier": "GREEN",
        "symptoms": ["bleeding after the menopause (this is the most common symptom)", "bleeding between periods", "heavier periods than usual (if you have not been through the menopause)", "a bloody or pink and watery vaginal discharge"],
        "reasoning": "Based on NHS Inform guidelines for Womb (uterus) cancer.",
        "treatment": ["your general health", "the type and size of the tumour", "whether the cancer has begun to spread"]
    },
    "wrist_fracture": {
        "diagnosis": "Wrist fracture",
        "tier": "GREEN",
        "symptoms": [],
        "reasoning": "Based on NHS Inform guidelines for Wrist fracture.",
        "treatment": []
    },
    "yellow_fever": {
        "diagnosis": "Yellow fever",
        "tier": "GREEN",
        "symptoms": ["a high temperature (fever)", "a headache", "nausea or vomiting", "muscle pain, including backache", "loss of appetite"],
        "reasoning": "Based on NHS Inform guidelines for Yellow fever.",
        "treatment": []
    },
    "zika_virus": {
        "diagnosis": "Zika virus",
        "tier": "GREEN",
        "symptoms": ["rash", "itching all over the body", "fever", "headache", "joint pain (with possible swelling, mainly in the smaller joints of the hands and feet)", "muscle pain", "conjunctivitis (red eyes)", "lower back pain", "pain behind the eyes"],
        "reasoning": "Based on NHS Inform guidelines for Zika virus.",
        "treatment": []
    }
};
