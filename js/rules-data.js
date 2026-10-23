// Official Motor Vehicle Act & Maharashtra Police Road Rules Directory (234 Rules)
const ALL_ROAD_RULES = [
    {
        "sr":  1,
        "section":  "Sec 4(1)/181 MVA",
        "nameEn":  "Driving Without valid License Below 16 Years of Age",
        "nameMr":  "वैध अनुज्ञापत्राशिवाय १६ वर्षे वयाखालील व्यक्तीने वाहन चालविणे",
        "fine":  "5,000",
        "repeatFine":  "5,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  2,
        "section":  "Sec 19 to 20/182 (1) MVA",
        "nameEn":  "License Disqualified Driver",
        "nameMr":  "अनुज्ञापत्र अपात्र चालक",
        "fine":  "10,000",
        "repeatFine":  "10,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  3,
        "section":  "Sec 39/192(1) MVA",
        "nameEn":  "Without valid Registration Any Vehicle (Driver)",
        "nameMr":  "विना वैध नोंदणी - दुचाकी (चालक )",
        "fine":  "2,000",
        "repeatFine":  "5,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  4,
        "section":  "Sec 39/192(1) MVA",
        "nameEn":  "Without valid Registration Any Vehicle (Owner)",
        "nameMr":  "विना वैध नोंदणी - दुचाकी (मालक )",
        "fine":  "2,000",
        "repeatFine":  "5,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  5,
        "section":  "Sec 3(1)/181 MVA",
        "nameEn":  "Driving Without valid License",
        "nameMr":  "वैध अनुज्ञापत्राशिवाय वाहन चालविणे",
        "fine":  "5,000",
        "repeatFine":  "5,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  6,
        "section":  "Sec 146/196 MVA",
        "nameEn":  "Without valid Insurance (Driver)",
        "nameMr":  "विना वैध विमा प्रमाणपत्र (चालक )",
        "fine":  "2,000",
        "repeatFine":  "4,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  7,
        "section":  "Sec 146/196 MVA",
        "nameEn":  "Without valid Insurance (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "विना वैध विमा प्रमाणपत्र (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "2,000",
        "repeatFine":  "4,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  8,
        "section":  "CMVR 3(C)/177 MVA",
        "nameEn":  "Driving Without L Board",
        "nameMr":  "विना एल फलक चालविणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  9,
        "section":  "CMVR 51/177 MVA",
        "nameEn":  "Illegal Number Plate Similar To DADA/ MAMA/ BABA Etc.",
        "nameMr":  "बेकायदेशीर क्रमांक फलक. उदा. मामा,दादा,बाबा इ.",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  10,
        "section":  "CMVR 51/177 MVA",
        "nameEn":  "Registration Number or Letters Not as Per Prescribed Measurement",
        "nameMr":  "नोंदणी क्रमांक विहीत मोजमापात नाही.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  11,
        "section":  "Sec 119/177 MVA",
        "nameEn":  "No entry in prescribed time limit period for specific vehicle / No entry on Bridge ( 2W - 3W - HMV)",
        "nameMr":  "विशिष्ट वाहनासाठी विहित वेळ मर्यादेत प्रवेश नाही / पुलावर प्रवेश नाही ( 2W - 3W - HMV)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  12,
        "section":  "Sec 125/177 MVA",
        "nameEn":  "Obstruction to Driver / Front seating",
        "nameMr":  "चालकास अडथळा / पुढील बैठक",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  13,
        "section":  "Sec 123/177 MVA",
        "nameEn":  "No Person to be carried on a running board or on the top or on the bonnet of a motor vehicle.",
        "nameMr":  "मोटार वाहनाच्या रिनंग बोर्डवर किंवा छतावर किंवा बॉनेटवर कोणाही इसमास वाहून नेऊ नये.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  14,
        "section":  "Sec 186 MVA",
        "nameEn":  "Driver unfit (Physically/Mentally)",
        "nameMr":  "चालक अयोग्य (शारीरिकदृष्ट्या / मानसिकदृष्ट्या )",
        "fine":  "1,000",
        "repeatFine":  "2,000",
        "category":  "General"
    },
    {
        "sr":  15,
        "section":  "MMVR 235/177 MVA",
        "nameEn":  "Dazzling Light",
        "nameMr":  "तीव्र प्रकाश",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  16,
        "section":  "CMVR 105/177 MVA",
        "nameEn":  "Without Light after sunset",
        "nameMr":  "विना प्रकाश सूर्यास्तानंतर",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  17,
        "section":  "CMVR 109/177 MVA",
        "nameEn":  "Without Parking Light",
        "nameMr":  "विना पार्किंग प्रकाश",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  18,
        "section":  "MMVR 236(1)/177 MVA",
        "nameEn":  "Light not visible",
        "nameMr":  "प्रकाश दिसत नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  19,
        "section":  "CMVR 119(2)/177 MVA",
        "nameEn":  "Vehicle fitted with any multi toned horn giving a succession of different notes or with another sound producing device giving an unduly harsh, shrill, loud or alarming noise.",
        "nameMr":  "मो. वाहनास वेगवेगळे आवाज निर्माण करणारा बहुविध आवाजाचा भोंगा किंवा अनावश्यक, कठोर, कर्कश, मोठ्या किंवा भीतीदायक आवाज निर्माण करणारे साधन बसविलेले असल्यास.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  20,
        "section":  "MMVR 239/177 MVA",
        "nameEn":  "Jumping signal",
        "nameMr":  "संकेतक ओलांडणे (जंपिंग सिग्नल)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  21,
        "section":  "Sec 189 MVA",
        "nameEn":  "Racing / Speed test violation ( Driver )",
        "nameMr":  "शर्यत / वेग परीक्षण उल्लंघन (चालक)",
        "fine":  "5,000",
        "repeatFine":  "10,000",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  22,
        "section":  "Sec 189 MVA",
        "nameEn":  "Racing / Speed test violation (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "शर्यत / वेग परीक्षण उल्लंघन (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "5,000",
        "repeatFine":  "10,000",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  23,
        "section":  "Sec 112/183(1) MVA (2-3 wheeler)",
        "nameEn":  "Speed violating by driver (2-3 wheeler)",
        "nameMr":  "वेग मर्यादा उल्लंघन चालकाद्वारे (२-३ चाकी )",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  24,
        "section":  "Sec 112/183(1) MVA (Tractor)",
        "nameEn":  "Speed violating by driver (Tractor)",
        "nameMr":  "वेग मर्यादा उल्लंघन चालकाद्वारे (ट्रॅक्टर )",
        "fine":  "1,500",
        "repeatFine":  "1,500",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  25,
        "section":  "Sec 112/183(1) MVA (LMV)",
        "nameEn":  "Speed violating by driver (LMV)",
        "nameMr":  "वेग मर्यादा उल्लंघन चालकाद्वारे (4 चाकी LMV )",
        "fine":  "2,000",
        "repeatFine":  "2,000",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  26,
        "section":  "Sec 112/183(1) MVA (MMV - HMV)",
        "nameEn":  "Speed violating by driver (MMV - HMV)",
        "nameMr":  "वेग मर्यादा उल्लंघन चालकाद्वारे (MMV - HMV )",
        "fine":  "4,000",
        "repeatFine":  "4,000",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  27,
        "section":  "MMVR 202/177MVA",
        "nameEn":  "Unsafe-dangerous transportation Of goods",
        "nameMr":  "मालाची असुरक्षित धोकादायक वाहतुक",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  28,
        "section":  "CMVR 93(8)/177 MVA",
        "nameEn":  "Unsafe goods beyond body",
        "nameMr":  "असुरक्षित माल वाहनाच्या भागाच्या बाहेर",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  29,
        "section":  "CMVR 100(2)/177 MVA",
        "nameEn":  "Tinted glasses /Black Film",
        "nameMr":  "रंगीत काचा / काचेवरील काळे आवरणे (फिल्म)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  30,
        "section":  "MMVR 165/177 MVA",
        "nameEn":  "Without Mud guard",
        "nameMr":  "विना चिखलरोधक (मडगार्ड)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  31,
        "section":  "MMVR 161/177 MVA",
        "nameEn":  "Without Side mirror",
        "nameMr":  "विना बाजूचा आरसा",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  32,
        "section":  "MMVR 162/177 MVA",
        "nameEn":  "TV/video set on dashboard",
        "nameMr":  "डॅशबोर्ड वर दूरचित्रवाणी/व्हिडीओ चालवणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  33,
        "section":  "MMVR 232/177 MVA",
        "nameEn":  "Without Silencer",
        "nameMr":  "विना आवाजप्रतिबंधक यंत्र (सायलेन्सर)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  34,
        "section":  "CMVR 94(3)/177 MVA",
        "nameEn":  "Tyres not in good and sound condition",
        "nameMr":  "चाके (टायर) चांगल्या बळकट स्थितीत नाहीत",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  35,
        "section":  "CMVR 104(1)/177 MVA",
        "nameEn":  "Without Red Reflector",
        "nameMr":  "विना लाल परावर्तक",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  36,
        "section":  "Sec 198 MVA",
        "nameEn":  "Unauthorized Interference with vehicle",
        "nameMr":  "वाहनाच्या संबंधीत अनधिकृत हस्तक्षेप",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "General"
    },
    {
        "sr":  37,
        "section":  "CMVR 101/177 MVA",
        "nameEn":  "Driving Without Wiper",
        "nameMr":  "विना झपाटा (वायपर) चालविणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  38,
        "section":  "MMVR 21(5)/177 MVA",
        "nameEn":  "Stop out of stand",
        "nameMr":  "थांब्याच्या बाहेर उभा (मोटर कॅब )",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  39,
        "section":  "MMVR 21(14)/177 MVA",
        "nameEn":  "Insufficient fuel (Motor Cab)",
        "nameMr":  "इंधन साठा पुरेसा नाही.(मोटर कॅब)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  40,
        "section":  "MMVR 21(7)/177 MVA",
        "nameEn":  "Meter flag down on stand (Motor Cab)",
        "nameMr":  "मिटर झेंडा खाली थांब्यावर (मोटर कॅब)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  41,
        "section":  "MMVR 21(10)/177 MVA",
        "nameEn":  "Carry cleaner in permit vehicle (Motor Cab)",
        "nameMr":  "परवानाधारक वाहनात क्लिनर नेणे. (मोटर कॅब)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  42,
        "section":  "MMVR 146/177",
        "nameEn":  "Faulty Meter (Motor Cab)",
        "nameMr":  "बिघडलेले मिटर (मोटर कॅब)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  43,
        "section":  "MMVR 21(18)/177 MVA",
        "nameEn":  "Cab / Taxi driver without white Uniform (Motor Cab)",
        "nameMr":  "कॅब /टॅक्सी चालक गणवेश पांढरा नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  44,
        "section":  "MMVR 21(18)/177 MVA",
        "nameEn":  "Without Uniform (Non-Meter Tourist/Cab)",
        "nameMr":  "विना विहित गणवेश - पर्यटक वाहन",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  45,
        "section":  "MMVR 21(18)/177 MVA",
        "nameEn":  "Without Cab Drivers I-Card (All Cab)",
        "nameMr":  "विना कॅब चालक ओळखपत्र",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  46,
        "section":  "MMVR 21(18)/177 MVA RW S.O. 415(E) dt. 8/6/1989",
        "nameEn":  "Without Prescribed Uniform (Tourist Cab)",
        "nameMr":  "विना विहीत गणवेश - पर्यटक वाहन",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  47,
        "section":  "MMVR 21(13)/177",
        "nameEn":  "Shouting for passenger (Motor Cab)",
        "nameMr":  "प्रवाशांचे लक्ष वेधण्यासाठी ओरडणे.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  48,
        "section":  "MMVR 21(16)/177",
        "nameEn":  "Driver Smoking while on duty (Motor Cab)",
        "nameMr":  "चालक कर्तव्यावर धुम्रपान करतो.(मोटर कॅब)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  49,
        "section":  "MMVR 23(1)/177 MVA",
        "nameEn":  "Obstruction to driver by carrying animal/things (Goods Carrier)",
        "nameMr":  "प्राणी / इतर सामान सहचालकास अडथळा (मालवाहक)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  50,
        "section":  "Sec 5/180 MVA",
        "nameEn":  "Permitting Driver to Drive MV Without License (Owner)",
        "nameMr":  "विना अनुज्ञापत्र चालकास वाहन चालविण्यास परवानगी देणे (मालक)",
        "fine":  "5,000",
        "repeatFine":  "5,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  51,
        "section":  "Sec 130(1)/177 MVA",
        "nameEn":  "Failed to Produce valid License",
        "nameMr":  "वैध अनुज्ञापत्र (लायसन्स) सादर केली नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  52,
        "section":  "CMVR 139/177 MVA",
        "nameEn":  "Failed to Produce Documents Within 15 Days of Demand in Writing",
        "nameMr":  "लेखी मागणीच्या १५ दिवसांच्या आत दस्तऐवज सादर केले नाहीत",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  53,
        "section":  "MMVR 134(1)/177 MVA",
        "nameEn":  "Using word / figure / drawing / sticker on vehicle (press / police / polite / advocate / etc.) advertisement on transport MV w/o RTO permission.",
        "nameMr":  "ट्रान्सपोर्ट वाहनावर शब्द, आकृती, चित्र चिकटवलेले (प्रेस, पोलीस, पोलाइट, एडव्होकेट, इ) जाहिरात RTO यांच्या अनुमती विना करणे.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  54,
        "section":  "Sec 179(1) MVA",
        "nameEn":  "Disobedience of Police order /direction",
        "nameMr":  "पोलीस आदेश निर्देशाचे अनुपालन न करणे",
        "fine":  "750",
        "repeatFine":  "750",
        "category":  "General"
    },
    {
        "sr":  55,
        "section":  "Sec 190(2) MVA (2-3 Wheeler)",
        "nameEn":  "Road safety standards violation (2-3 Wheeler) (Driver)",
        "nameMr":  "रस्ते सुरक्षा मानके भंग (२-३ चाकी ) (चालक )",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "3,000",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  56,
        "section":  "Sec 190(2) MVA (2-3 Wheeler)",
        "nameEn":  "Road safety standards violation (2-3 Wheeler) (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "रस्ते सुरक्षा मानके भंग (२-३ चाकी ) (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "3,000",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  57,
        "section":  "Sec 190(2) MVA (Other than 2-3 Wheeler)",
        "nameEn":  "Road safety standards violation (Other than 2-3 Wheeler) (Driver)",
        "nameMr":  "रस्ते सुरक्षा मानके भंग (२-३ चाकी व्यतिरिक्त ) (चालक )",
        "fine":  "2,000 \u0026 3M Susp.",
        "repeatFine":  "5,000",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  58,
        "section":  "Sec 190(2) MVA (Other than 2-3 Wheeler)",
        "nameEn":  "Road safety standards violation (Other than 2-3 Wheeler) (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "रस्ते सुरक्षा मानके भंग (२-३ चाकी व्यतिरिक्त ) (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "2,000 \u0026 3M Susp.",
        "repeatFine":  "5,000",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  59,
        "section":  "CMVR 102(2)/177 MVA",
        "nameEn":  "Without Red Rear Lamp or light",
        "nameMr":  "विना लाल मागील दिवा किंवा प्रकाश",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  60,
        "section":  "MMVR 4/177 MVA",
        "nameEn":  "Valid Badge not in the name of Driver of passenger carrier.",
        "nameMr":  "वैध बॅच प्रवासी वाहनाच्या चालकाच्या नावावर नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  61,
        "section":  "MMVR 249/177 MVA",
        "nameEn":  "HMV without cleaner",
        "nameMr":  "अवजड वाहन क्लिनरशिवाय (क्लिनर)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  62,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Visibility of number plate on front and rear of vehicle",
        "nameMr":  "वाहनाचा पुढील व मागील क्रमांक फलक दृश्यमानता",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  63,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Number Plate of Transport Vehicle Not Displayed at Four Places",
        "nameMr":  "परिवहन वाहनाचा क्रमांक फलक वाहनाच्या चारही बाजूस दर्शित नाही.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  64,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Registration Number of Taxi Not Painted On Dash Board",
        "nameMr":  "नोंदणी क्रमांक टॅक्सीच्या डॅशबोर्डवर रंगवलेला नाही.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  65,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Trailers Rear Side Number Plate Not Displayed",
        "nameMr":  "ट्रेलरच्या पाठीमागील क्रमांक फलक दर्शित नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  66,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Number Plate Bears Personnel Name or Pictures or Symbols etc.",
        "nameMr":  "क्रमांक फलक वैयक्तिक नाव किंवा चित्र किंवा निशाणी इत्यादी धारी असणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  67,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "LMV Number Plate Not at Middle with Illumination",
        "nameMr":  "हलक्या मोटार वाहनाचा क्रमांक फलक मध्यभागी नाही प्रकाशमयरीत्या",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  68,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Rear Side Number Plate of Transport Vehicle Not Illuminated",
        "nameMr":  "परिवहन वाहनाचा पाठीमागील क्रमांक फलक प्रकाशमय नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  69,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Number Plate Letters Not In English And Figures Not In Arabic Numerals",
        "nameMr":  "क्रमांक फलकावरील अक्षरे इंग्रजी आणि आकडे अरेबिक नसता",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  70,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Number Plate Broken",
        "nameMr":  "तुटलेला क्रमांक फलक",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  71,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Number Plate with Unauthorized Colour",
        "nameMr":  "अनधिकृत रंगाचा क्रमांक फलक",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  72,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Registration Number not In Four Digits",
        "nameMr":  "नोंदणी क्रमांक चार आकडी नाही.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  73,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Number Plate of Motor Cycle Not Parallel to Handle Bar",
        "nameMr":  "मोटार सायकलचा क्रमांक फलक हँडल बारला समांतर नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  74,
        "section":  "MMVR 229(2)/177 MVA",
        "nameEn":  "Unsafe goods beyond body No White reflector disc \u0026 additional Red lamp attached at the rear.",
        "nameMr":  "वाहनाच्या भागाच्या बाहेर मालाची असुरक्षित वाहतूक, पांढरी परावर्तक चकती आणि अतिरिक्त लाल दिवा पाठीमागे अडकविलेला नाही",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  75,
        "section":  "MMVR 20(1)(ix)/177 MVA",
        "nameEn":  "Failed to display valid badge(PSV other than M.CAB)",
        "nameMr":  "वैध बिल्ला परिधान केला नाही. (सार्वजनिक सेवा वाहन मोटर कॅब वगळून)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  76,
        "section":  "Sec 56/39/192 MVA",
        "nameEn":  "Without valid fitness certificate (Driver)",
        "nameMr":  "विना वैध योग्यता प्रमाणपत्र (चालक)",
        "fine":  "2,000",
        "repeatFine":  "5,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  77,
        "section":  "Sec 56/39/192 MVA",
        "nameEn":  "Without valid fitness certificate (Owner)",
        "nameMr":  "विना वैध योग्यता प्रमाणपत्र (मालक)",
        "fine":  "2,000",
        "repeatFine":  "5,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  78,
        "section":  "CMVR 93(4)/177 MVA",
        "nameEn":  "Load extends to height beyond Limits/projection of load above 3.8 meters Transport Vehicles.",
        "nameMr":  "भाराची उंची मर्यादा / प्रक्षेपणाच्या पलीकडे 3.8 मीटर पेक्षा जास्त असल्यास - परिवहन वाहने",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  79,
        "section":  "CMVR 125 r/w S.O. 1365(E) Dt. 19/12/2004 /177 MVA",
        "nameEn":  "Right side door not locked - Rickshaw",
        "nameMr":  "रिक्षाचा उजवा दरवाजा बंद नाही किंवा उजव्या दाराला कुलूप नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  80,
        "section":  "MMVR 21(19)/177 MVA",
        "nameEn":  "Unclean vehicle (Motor Cab)",
        "nameMr":  "अस्वच्छ वाहन (मोटर कॅब)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  81,
        "section":  "Sec 66 (I) r/w Sec 192 (A) MVA",
        "nameEn":  "Without valid permit (Driver)",
        "nameMr":  "वैध परवान्याशिवाय (चालक)",
        "fine":  "10,000",
        "repeatFine":  "10,000",
        "category":  "General"
    },
    {
        "sr":  82,
        "section":  "Sec 66 (I) r/w Sec 192 (A) MVA",
        "nameEn":  "Without valid permit (Owner)",
        "nameMr":  "वैध परवान्याशिवाय (मालक)",
        "fine":  "10,000",
        "repeatFine":  "10,000",
        "category":  "General"
    },
    {
        "sr":  83,
        "section":  "CMVR 103/177 MVA",
        "nameEn":  "Driving Without indicator",
        "nameMr":  "विना दर्शक (इंडिकेटर) चालविणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  84,
        "section":  "CMVR 3(b)/177 MVA",
        "nameEn":  "Learner Driver not accompanied with trainer",
        "nameMr":  "शिकारू चालकासोबत प्रशिक्षक नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  85,
        "section":  "MMVR 224/177 MVA",
        "nameEn":  "Restrictions on driving with gear disengaged/ Driving with neutral gear in ghats.",
        "nameMr":  "तरफा संच (गिअर) मोकळा ठेवून वाहन चालविण्यावर मनाई /तरफासंच (गिअर) मोकळा ठेवून (न्यूट्रल) घाटात वाहन चालविणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  86,
        "section":  "Sec 84(G) r/w 177 MVA",
        "nameEn":  "Permit Holder MV - Name and Address of the operator not painted or firmly affixed to every vehicle",
        "nameMr":  "परवाना धारी प्रत्येक वाहनावर सेवाचालकाचे (ऑपरेटर) नाव व पत्ता रंगविलेले किंवा पत्ता बसविला पाहिजे.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  87,
        "section":  "CMVR 115(7)/177 MVA",
        "nameEn":  "Failed to produce valid PUCC",
        "nameMr":  "वैध पीयुसीसी सादर केली नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  88,
        "section":  "MMVR 20(1) (xvi)/177 MVA",
        "nameEn":  "Failed to produce valid driving license on demand (public service vehicle) Driver permitted to produce within 48 hours of demand",
        "nameMr":  "वैध अनुज्ञापत्र सादर केले नाही. पीएसव्ही चालकास अनुज्ञापत्र सादर करण्यास 48 तासांची सवलत आहे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  89,
        "section":  "Sec 6(1)/179 MVA",
        "nameEn":  "Driver found with two licenses in his name",
        "nameMr":  "चालकाच्या नावावर दोन अनुज्ञापत्रे आढळून आली",
        "fine":  "750",
        "repeatFine":  "750",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  90,
        "section":  "MMVR 20(1)(x)/177 MVA",
        "nameEn":  "Unclean vehicle (public service vehicle)",
        "nameMr":  "अस्वच्छ वाहन (सार्वजनिक सेवा वाहन)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  91,
        "section":  "MMVR 108/177 MVA",
        "nameEn":  "Carriage of persons in goods vehicle",
        "nameMr":  "मालवाहू वाहनातून इसमांची वाहतूक",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  92,
        "section":  "MMVR 163/177 MVA",
        "nameEn":  "Dangerous projection",
        "nameMr":  "धोकादायकपणे पुढे आलेला भाग",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  93,
        "section":  "MMVR 168/177 MVA",
        "nameEn":  "Use of military/ police colours \u0026 registration mark prohibited",
        "nameMr":  "मिलिटरी/पोलीस रंग आणि नोंदणी चिन्ह यांच्या वापरास मनाई",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  94,
        "section":  "MMVR 21(17)/177 MVA",
        "nameEn":  "Misbehaviour towards passenger \u0026 others (motor cab)",
        "nameMr":  "प्रवासी व इतरांसोबत गैरवर्तनुक (मोटर कॅब)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  95,
        "section":  "MMVR 20(1)(i)/177 MVA",
        "nameEn":  "Allowing any person animal or thing to be in the space reserved for driver (PSV other than M.CAB)",
        "nameMr":  "वाहकास आरक्षित जागेत प्राणी किंवा इतर वस्तू ठेवण्यास अनुमती देणे. (सार्वजनिक सेवा वाहन मोटर कॅब वगळून)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  96,
        "section":  "MMVR 20(1)(ii)/177 MVA",
        "nameEn":  "Shouting for passenger (PSV other than M.CAB)",
        "nameMr":  "प्रवाशांसाठी ओरडणे (सार्वजनिक सेवा वाहन मोटर कॅब वगळून)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  97,
        "section":  "MMVR 20(1)(vi)/177 MVA",
        "nameEn":  "Smoking while on duty (PSV other than M.CAB)",
        "nameMr":  "कर्तव्यावर धुम्रपान करणे (सार्वजनिक सेवा वाहन मोटार कॅब वगळून )",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  98,
        "section":  "MMVR 20(1)(vii)/177 MVA",
        "nameEn":  "Misbehaviour towards passenger \u0026 others (PSV other than M.CAB)",
        "nameMr":  "प्रवासी व इतरांसोबत गैरवर्तनुक (सार्वजनिक सेवा वाहन मोटर कॅब वगळून)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  99,
        "section":  "MMVR 20(1)(viii)/177 MVA",
        "nameEn":  "Driver without Khaki uniform (PSV other than M.CAB)",
        "nameMr":  "चालक विना खाकी गणवेश (सार्वजनिक सेवा वाहन मोटर कॅब वगळून)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  100,
        "section":  "MMVR 20(1)(xii)/177 MVA",
        "nameEn":  "Unnecessarily delay the journey (PSV other than M.CAB)",
        "nameMr":  "प्रवासात अनावश्यक विलंब केला (सार्वजनिक सेवा वाहन मोटर कॅब वगळून )",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  101,
        "section":  "Sec 120/177 MVA",
        "nameEn":  "Motor Vehicle with left hand drive without displaying mechanical or signalling device board at the rear side (owner \u0026 driver both)",
        "nameMr":  "डावा हात चालक मो.वाहन विना यांत्रिक किंवा सांकेतिक उपकरण फलक पाठीमागे (मालक व चालक दोन्ही)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  102,
        "section":  "MMVR 24(2)/177 MVA",
        "nameEn":  "Failed to display Badge (HMV passenger carrier)",
        "nameMr":  "बिल्ला दर्शित केला नाही. एच एम व्ही प्रवाशांची वाहतूक",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  103,
        "section":  "CMVR 43/177 MVA",
        "nameEn":  "Form No. 19 duplicate copy not produced.",
        "nameMr":  "फॉर्म क्रमांक १९ ची दुसरी प्रत सादर न करणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  104,
        "section":  "CMVR 40/177 MVA",
        "nameEn":  "Identification card Issued by Dealer not produced",
        "nameMr":  "डिलरद्वारे प्रस्तुत केलेले ओळखपत्र तपासणीसाठी सादर केलेले नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  105,
        "section":  "CMVR 39(2)/177 MVA",
        "nameEn":  "Original T.C. Not produced",
        "nameMr":  "मूळ टीसी सादर न करणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  106,
        "section":  "CMVR 117/177 MVA",
        "nameEn":  "Speedo Meter Wire fraud detected",
        "nameMr":  "स्पीडो मीटर मशीन पासून स्पीडो मीटर वायर वेगळी केल्याचे आढळले",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  107,
        "section":  "MMVR 54(3)/177 MVA",
        "nameEn":  "F.T. Form not submitted to local RTO within seven days of arrival in M.S. (Only White Number Plate)",
        "nameMr":  "महाराष्ट्रात प्रवेश केल्याच्या सात दिवसांच्या आत स्थानिक आरटीओ ला एफ टी नमुन्यात आगमनाबाबत कळविले नाही. (केवळ श्वेत क्रमांक प्लेट )",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  108,
        "section":  "Sec 129/194(D) MVA",
        "nameEn":  "Riding without helmet by Driver (Owner)",
        "nameMr":  "हेल्मेटशिवाय मोटारसायकल चालवणे, (मालक)",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "1,000 \u0026 3M Susp.",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  109,
        "section":  "Sec 129/194(D) MVA",
        "nameEn":  "Riding without helmet by Pillion (Owner)",
        "nameMr":  "हेल्मेटशिवाय मोटारसायकल वरील दुसरी बैठक (मालक)",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "1,000 \u0026 3M Susp.",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  110,
        "section":  "Sec 129/194(D) MVA",
        "nameEn":  "Riding without helmet by Driver (Driver)",
        "nameMr":  "हेल्मेटशिवाय मोटारसायकल चालवणे, (चालक)",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "1,000 \u0026 3M Susp.",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  111,
        "section":  "Sec 129/194(D) MVA",
        "nameEn":  "Riding without helmet by Pillion (Driver)",
        "nameMr":  "हेल्मेटशिवाय मोटारसायकल वरील दुसरी बैठक (चालक)",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "1,000 \u0026 3M Susp.",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  112,
        "section":  "Sec 184C MVA (2-3 Wheeler)",
        "nameEn":  "Person driving the vehicle only to extent of use of handheld communication devices (2-3 Wheeler)",
        "nameMr":  "वाहन चालविणारी व्यक्ती हातामध्ये धरलेले मोबाईल संप्रेषण उपकरणाचा वापर करतांना आढळल्यास (२-३ चाकी)",
        "fine":  "1,000",
        "repeatFine":  "10,000 (3 yrs)",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  113,
        "section":  "Sec 184C MVA (LMV)",
        "nameEn":  "Person driving the vehicle only to extent of use of handheld communication devices (LMV)",
        "nameMr":  "वाहन चालविणारी व्यक्ती हातामध्ये धरलेले मोबाईल संप्रेषण उपकरणाचा वापर करतांना आढळल्यास (LMV )",
        "fine":  "2,000",
        "repeatFine":  "10,000 (3 yrs)",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  114,
        "section":  "Sec 184C MVA (Other Vehicles)",
        "nameEn":  "Person driving the vehicle only to extent of use of handheld communication devices (Other Vehicles)",
        "nameMr":  "वाहन चालविणारी व्यक्ती हातामध्ये धरलेले मोबाईल संप्रेषण उपकरणाचा वापर करतांना आढळल्यास (इतर वाहने)",
        "fine":  "4,000",
        "repeatFine":  "10,000 (3 yrs)",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  115,
        "section":  "Sec 194B(1) MVA",
        "nameEn":  "Without Seatbelt",
        "nameMr":  "विना बैठक सुरक्षा पट्टा (सिटबेल्ट)",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  116,
        "section":  "Sec 119/177 MVA",
        "nameEn":  "One way traffic sign not obeyed",
        "nameMr":  "एकेरी मार्ग वाहतूक चिन्ह पाळले नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  117,
        "section":  "Sec 128(1)/194(C) MVA",
        "nameEn":  "Drive a motor cycle with triple seat. ( Driver )",
        "nameMr":  "मो.सायकलवर तीन बसलेले. (चालक)",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "1,000 \u0026 3M Susp.",
        "category":  "General"
    },
    {
        "sr":  118,
        "section":  "Sec 128(1)/194(C) MVA",
        "nameEn":  "Drive a motor cycle with triple seat. (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "मो.सायकलवर तीन बसलेले. (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,000 \u0026 3M Susp.",
        "repeatFine":  "1,000 \u0026 3M Susp.",
        "category":  "General"
    },
    {
        "sr":  119,
        "section":  "CMVR 109/177 MVA",
        "nameEn":  "Driving vehicle with parking light on",
        "nameMr":  "वाहन उभे करण्याचे दिवे सुरू असताना वाहन चालविणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  120,
        "section":  "Sec 194F (a)(i) MVA",
        "nameEn":  "Sounds the horn needlessly or continuously or more than necessary to ensure safety.",
        "nameMr":  "अनावश्यक असता किंवा सातत्याने किंवा सुरक्षा खात्री साठी आवश्यकतेपेक्षा जास्त हॉर्न वाजविणे",
        "fine":  "1,000",
        "repeatFine":  "2,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  121,
        "section":  "Sec 194F (a)(ii)MVA",
        "nameEn":  "Sound the horn in an area with a traffic sign prohibiting use of a horn.",
        "nameMr":  "हॉर्न वाजविण्यास मनाई, वाहतूक चिन्ह असलेल्या क्षेत्रात हॉर्न वाजविण्यास",
        "fine":  "1,000",
        "repeatFine":  "2,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  122,
        "section":  "Sec 194F (b) MVA",
        "nameEn":  "Drives a Motor vehicle which makes use of a cut out by which exhaust gases are released other than through the silencer",
        "nameMr":  "कट-आउटचा वापर करून सायलेन्सर ऐवजी इतर मार्गातून धूर बाहेर पडण्यास मार्ग निर्माण केलेले मो. वाहन चालविणे",
        "fine":  "1,000",
        "repeatFine":  "2,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  123,
        "section":  "MMVR 239/177 MVA",
        "nameEn":  "Police manual signal violation",
        "nameMr":  "पोलिसाने केलेल्या इशाऱ्याचे पालन न करणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  124,
        "section":  "MMVR 239/177 MVA",
        "nameEn":  "Police stop violation",
        "nameMr":  "पोलिसांनी थांबण्यास सांगिताचे उल्लंघन करणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  125,
        "section":  "MMVR 226/177 MVA",
        "nameEn":  "Unsafe Towing while towing another vehicle",
        "nameMr":  "असुरक्षित ओढणे - दुसऱ्या वाहनास ओढणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  126,
        "section":  "MMVR 162/177 MVA",
        "nameEn":  "Driver found watching digital motion pictures/videos while driving (Except route navigation)",
        "nameMr":  "वाहन चालवताना चालक अंकीय (डिजिटल) चलचित्र व्हिडीओ पाहताना आढळला",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  127,
        "section":  "Sec 178(3) MVA",
        "nameEn":  "Refusal to ply auto Rickshaw or to carry passenger",
        "nameMr":  "रिक्षा / टॅक्सी भाड्याने देण्यास नकार देणे",
        "fine":  "50",
        "repeatFine":  "50",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  128,
        "section":  "Sec 178(3) MVA",
        "nameEn":  "Refusal to ply taxi / bus or to carry passenger",
        "nameMr":  "टॅक्सी / बस भाड्यावर देण्यास नकार देणे",
        "fine":  "200",
        "repeatFine":  "200",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  129,
        "section":  "Sec 194A MVA - (Extra 1)",
        "nameEn":  "Excess passenger 1 ( Driver )",
        "nameMr":  "1 अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "200",
        "repeatFine":  "200",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  130,
        "section":  "Sec 194A MVA - (Extra 1)",
        "nameEn":  "Excess passenger 1 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "1 अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "200",
        "repeatFine":  "200",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  131,
        "section":  "Sec 194A MVA - (Extra 2)",
        "nameEn":  "Excess passengers 2 ( Driver )",
        "nameMr":  "2 अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "400",
        "repeatFine":  "400",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  132,
        "section":  "Sec 194A MVA - (Extra 2)",
        "nameEn":  "Excess passengers 2 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "2 अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "400",
        "repeatFine":  "400",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  133,
        "section":  "Sec 194A MVA - (Extra 3)",
        "nameEn":  "Excess passengers 3 ( Driver )",
        "nameMr":  "3 अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "600",
        "repeatFine":  "600",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  134,
        "section":  "Sec 194A MVA - (Extra 3)",
        "nameEn":  "Excess passengers 3 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "3 अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "600",
        "repeatFine":  "600",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  135,
        "section":  "Sec 194A MVA - (Extra 4)",
        "nameEn":  "Excess passengers 4 ( Driver )",
        "nameMr":  "4 अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "800",
        "repeatFine":  "800",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  136,
        "section":  "Sec 194A MVA - (Extra 4)",
        "nameEn":  "Excess passengers 4 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "4 अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "800",
        "repeatFine":  "800",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  137,
        "section":  "Sec 194A MVA - (Extra 5)",
        "nameEn":  "Excess passengers 5 ( Driver )",
        "nameMr":  "5 अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  138,
        "section":  "Sec 194A MVA - (Extra 5)",
        "nameEn":  "Excess passengers 5 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "5 अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  139,
        "section":  "Sec 194A MVA - (Extra 6)",
        "nameEn":  "Excess passengers 6 ( Driver )",
        "nameMr":  "६ अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "1,200",
        "repeatFine":  "1,200",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  140,
        "section":  "Sec 194A MVA - (Extra 6)",
        "nameEn":  "Excess passengers 6 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "६ अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,200",
        "repeatFine":  "1,200",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  141,
        "section":  "Sec 194A MVA - (Extra 7)",
        "nameEn":  "Excess passengers 7 ( Driver )",
        "nameMr":  "७ अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "1,400",
        "repeatFine":  "1,400",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  142,
        "section":  "Sec 194A MVA - (Extra 7)",
        "nameEn":  "Excess passengers 7 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "७ अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,400",
        "repeatFine":  "1,400",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  143,
        "section":  "Sec 194A MVA - (Extra 8)",
        "nameEn":  "Excess passengers 8 ( Driver )",
        "nameMr":  "८ अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "1,600",
        "repeatFine":  "1,600",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  144,
        "section":  "Sec 194A MVA - (Extra 8)",
        "nameEn":  "Excess passengers 8 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "८ अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,600",
        "repeatFine":  "1,600",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  145,
        "section":  "Sec 194A MVA - (Extra 9)",
        "nameEn":  "Excess passengers 9 ( Driver )",
        "nameMr":  "९ अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "1,800",
        "repeatFine":  "1,800",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  146,
        "section":  "Sec 194A MVA - (Extra 9)",
        "nameEn":  "Excess passengers 9 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "९ अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,800",
        "repeatFine":  "1,800",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  147,
        "section":  "Sec 194A MVA - (Extra 10)",
        "nameEn":  "Excess passengers 10 ( Driver )",
        "nameMr":  "१० अतिरिक्त प्रवासी वाहतुक (चालक)",
        "fine":  "2,000",
        "repeatFine":  "2,000",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  148,
        "section":  "Sec 194A MVA - (Extra 10)",
        "nameEn":  "Excess passengers 10 (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "१० अतिरिक्त प्रवासी वाहतुक (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "2,000",
        "repeatFine":  "2,000",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  149,
        "section":  "MMVR 23(1)/177 MVA",
        "nameEn":  "Excess number of persons sitting in cabin of goods carriage",
        "nameMr":  "मालवाहू चालकाच्या खोलीत (कॅबीन) अतिरिक्त इसम बसलेले",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  150,
        "section":  "MMVR 228/177 MVA",
        "nameEn":  "Driving vehicle on Footpath/Cycle track without Permission of Police Officer",
        "nameMr":  "पोलीस अधिकाऱ्याच्या अनुमतीशिवाय वाहन पदपथावर सायकल मार्गावर चालविणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  151,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Displaying / inscribing or writing letter / word / figure / picture or symbol on number plate",
        "nameMr":  "शब्द, आकृती, चित्र किंवा निशाणी क्रमांक फलकावर दर्शित करणे किंवा लिहिणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  152,
        "section":  "CMVR 50/177 MVA",
        "nameEn":  "Driving or parking vehicle on public road without number plate ( Vehicle registered but Number plate not displayed.)",
        "nameMr":  "क्रमांक फलक धारण न केलेले वाहन सार्वजनिक ठिकाणी चालविणे, उभे करणे.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  153,
        "section":  "MMVR 236/177 MVA",
        "nameEn":  "Hiding fully/partly number plate by placing load/other goods/",
        "nameMr":  "भार किंवा इतर मालामुळे क्रमांक फलक पूर्णतः किंवा अंशतः थोडासा दडविणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  154,
        "section":  "MMVR 237/177 MVA",
        "nameEn":  "Not Stopping before stop line",
        "nameMr":  "थांबा रेषा (स्टॉप लाईन) अगोदर वाहन थांबविले नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  155,
        "section":  "Sec 194B(2) MVA",
        "nameEn":  "Child up to 14 years age not provided seat with appropriate child restraint system (Driver)",
        "nameMr":  "चौदा वर्षापर्यंतच्या वयाच्या बालकास अटकाव व्यवस्थेसह बैठक पुरवण्यात आलेली नाही (चालक )",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  156,
        "section":  "Sec 194B(2) MVA",
        "nameEn":  "Child up to 14 years age not provided seat with appropriate child restraint system (Owner or person in authorized possession of the Vehicle.)",
        "nameMr":  "चौदा वर्षापर्यंतच्या वयाच्या बालकास अटकाव व्यवस्थेसह बैठक पुरवण्यात आलेली नाही (मालक किंवा वाहनाचा अधिकृत ताबा असलेली व्यक्ती)",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  157,
        "section":  "MMVR 231(1)/177 MVA",
        "nameEn":  "Loud music played in vehicle",
        "nameMr":  "वाहनात मोठ्या आवाजात संगीत लावणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  158,
        "section":  "MMVR 233/177 MVA",
        "nameEn":  "Restrictions on driving backwards/in reverse direction",
        "nameMr":  "वाहन पाठीमागे घेण्याबाबत निर्बंध. उलट दिशेने",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  159,
        "section":  "MMVR 233/177 MVA",
        "nameEn":  "Driving backwards/in reverse direction on road/in a parking/any other public place",
        "nameMr":  "रस्त्यात / उभे केलेल्या ठिकाणी / सार्वजनिक ठिकाणी वाहन पाठीमागे उलट दिशेने चालवणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  160,
        "section":  "MMVR 230/177 MVA.",
        "nameEn":  "Restrictions to carry unpacked dangerous substances/explosive/highly inflammable substance on Public Service Vehicle",
        "nameMr":  "सार्वजनिक सेवा वाहनातून पॅक न केलेले धोकादायक पदार्थ / स्फोटके /अतिज्वलनशील पदार्थ वाहून नेण्यावरील निर्बंध",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  161,
        "section":  "Sec 122/177 MVA RW Sec 127 MVA (Towing)",
        "nameEn":  "Causing danger, obstructions or undue inconvenience to other users of public place or to the passengers by allowing the vehicle to be abandoned or to remain at rest on any public place. (Towing)",
        "nameMr":  "सार्वजनिक ठिकाणी लोकांना धोका, अडथळा किंवा गैरसोय होईल अशाप्रकारे गाडी उभी केल्यामुळे गाडी क्रेन ने ओढून नेणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  162,
        "section":  "Sec 194B(1) MVA",
        "nameEn":  "Without seatbelt other than driver",
        "nameMr":  "चालक व्यतिरिक्त सीटबेल्ट नसलेले प्रवासी",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Helmet \u0026 Seatbelt"
    },
    {
        "sr":  163,
        "section":  "Sec 122/177 MVA",
        "nameEn":  "Causing danger, obstructions or undue inconvenience to other users of public place or to the passengers by allowing the vehicle to be abandoned or to remain at rest on any public place.",
        "nameMr":  "सार्वजनिक ठिकाणी लोकांना धोका, अडथळा किंवा गैरसोय होईल अशाप्रकारे गाडी उभी करणे",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  164,
        "section":  "Sec 194E MVA",
        "nameEn":  "Not providing way for emergency vehicles (Fire service, Ambulance \u0026 any other emergency vehicle specified by State govt.).",
        "nameMr":  "अत्यंत निकडीच्या (अग्निशामक सेवा, रुग्णवाहिका आणि राज्य सरकारने निर्दिष्ट केलेले इतर कोणतेही आपत्कालीन वाहन) गाड्यांना जाण्यास जागा न देणे",
        "fine":  "10,000",
        "repeatFine":  "10,000",
        "category":  "General"
    },
    {
        "sr":  165,
        "section":  "Sec 182(1) MVA",
        "nameEn":  "Driving the vehicle by a person who is disqualified for holding or obtaining driving license.",
        "nameMr":  "वाहन चालविण्यासाठी लागणाऱ्या अनुज्ञापत्रासाठी अपात्र असलेल्या व्यक्तीने वाहन चालविणे",
        "fine":  "10,000",
        "repeatFine":  "10,000",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  166,
        "section":  "CMVR 92/177 MVA",
        "nameEn":  "Unauthorizedly maintained motor vehicle, allowed to be driven on public road - (Driver)",
        "nameMr":  "अनधिकृतपणे देखभाल केलेले मोटार वाहन सार्वजनिक रस्त्यावर चालवण्याची परवानगी - (चालक)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  167,
        "section":  "CMVR 92/177 MVA",
        "nameEn":  "Unauthorizedly maintained motor vehicle, allowed to be driven on public road - (Owner)",
        "nameMr":  "अनधिकृतपणे देखभाल केलेले मोटार वाहन सार्वजनिक रस्त्यावर चालवण्याची परवानगी - (मालक)",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  168,
        "section":  "CMVR 9(3)/177 MVA",
        "nameEn":  "Driver failed to get endorsement in his Driving License from RTO for Transportation of Hazardous or Dangerous goods.",
        "nameMr":  "धोकादायक किंवा धोकादायक वस्तूंच्या वाहतुकीसाठी RTO कडून त्याच्या ड्रायव्हिंग लायसन्समध्ये ड्रायव्हरला मान्यता मिळू शकली नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "License \u0026 Papers"
    },
    {
        "sr":  169,
        "section":  "Sec 184 MVA",
        "nameEn":  "Dangerous driving",
        "nameMr":  "धोकादायकपणे वाहन चालविणे",
        "fine":  "Court / Jail",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  170,
        "section":  "Sec 185 MVA",
        "nameEn":  "Drunk and Drive",
        "nameMr":  "मद्यप्राशन करून वाहन चालविणे",
        "fine":  "Court / Jail",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  171,
        "section":  "Sec 190(1) MVA",
        "nameEn":  "Driving of defective motor vehicle",
        "nameMr":  "सदोष मोटारवाहन चालविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  172,
        "section":  "Sec 190(3) MVA",
        "nameEn":  "Carrying Hazardous or Dangerous Goods in contravention to the MV ACT and CMVR Provision",
        "nameMr":  "मोटार वाहन कायदा व केंद्रीय मोटार वाहन नियम यांचे उल्लंघन करून धोकादायक / घातक वस्तू वाहून नेणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  173,
        "section":  "Sec 197 MVA",
        "nameEn":  "Custody of Motor Vehicle without consent of Owner or Removal of Vehicle without legal authority",
        "nameMr":  "कायदेशीर अधिकार नसता मालकाच्या संमतीशिवाय मोटार वाहनाचा वापर करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  174,
        "section":  "MVDR 9/177A MVA",
        "nameEn":  "Not Slowing Down at Junction and Zebra Crossing",
        "nameMr":  "चौक किंवा पादचारी सारणी येथे वेग कमी न करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  175,
        "section":  "MVDR 14(2)/177A MVA",
        "nameEn":  "Overtaking from left",
        "nameMr":  "डाव्या बाजूने ओव्हरटेकिंग करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  176,
        "section":  "MVDR 6(1)/177A MVA",
        "nameEn":  "Lane cutting",
        "nameMr":  "मार्गिका छाटणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  177,
        "section":  "MVDR 4/122 177A MVA",
        "nameEn":  "Wrong side driving",
        "nameMr":  "चुकीच्या दिशेने वाहन चालविणे. (मा. उच्च न्यायालय निर्देश) धोकादायकपणे वाहन चालविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  178,
        "section":  "MVDR 14(9)/177A MVA",
        "nameEn":  "Overtaking obstructed",
        "nameMr":  "ओव्हरटेक करताना अडथळा करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  179,
        "section":  "MVDR 37(2) 177A MVA",
        "nameEn":  "NO use of mobile phone by trainer while training learner driver",
        "nameMr":  "शिकवू चालकास प्रशिक्षित करणाऱ्या शिक्षकाने शिक्षणादरम्यान भ्रमणध्वनीचा वापर करू नये",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  180,
        "section":  "MVDR 14(5)(d)/177A MVA",
        "nameEn":  "Overtaking on a bend/corner/turning",
        "nameMr":  "वळणे/ कोपरा / वळताना ओव्हरटेक करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  181,
        "section":  "MVDR 19(2)(ii)/177A MVA",
        "nameEn":  "Overtaking within barriers of a railway crossing",
        "nameMr":  "रेल्वे ओलांडणी प्रतिबंधित क्षेत्रात ओव्हरटेक करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  182,
        "section":  "MVDR 14(5)(e)/177A MVA",
        "nameEn":  "Overtaking at junctions/intersections/zebra crossing",
        "nameMr":  "चौक / छेद रस्ता / पादचारी सारणी येथे ओव्हरटेक करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  183,
        "section":  "MVDR 14(5)(h)/177A MVA",
        "nameEn":  "Overtaking in School/Hospital/Construction Zone area",
        "nameMr":  "शाळा / रुग्णालय / बांधकाम क्षेत्र परिसरात ओव्हरटेक करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  184,
        "section":  "MVDR 14(7)/177A MVA",
        "nameEn":  "Giving right turn indicator to following vehicle for overtaking",
        "nameMr":  "ओव्हरटेक करण्यासाठी उजवा दर्शक देणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  185,
        "section":  "MVDR 20(2)/177A MVA",
        "nameEn":  "Overtaking/U-Turn/drive backward in a tunnel",
        "nameMr":  "बोगद्यात ओव्हरटेक / यु वळण / मागे चालविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  186,
        "section":  "MVDR 4(5)6(2)/177A MVA",
        "nameEn":  "Heavy vehicles continuously driving in right lane",
        "nameMr":  "अवजड वाहन अखंडित उजव्या मार्गिकेतून चालविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  187,
        "section":  "MVDR 6(4)/177A MVA",
        "nameEn":  "Driver crossing white/yellow Solid lane lines at time of overtaking",
        "nameMr":  "ओव्हरटेक करताना चालक पांढरी / पिवळी अखंडित रेषा ओलांडतो",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  188,
        "section":  "MVDR 11(1)/177A MVA",
        "nameEn":  "Turning left/right without hand signal indication",
        "nameMr":  "हाताने संकेत न करता डावे / उजवे वळण घेणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  189,
        "section":  "MVDR 16(4)/177A MVA",
        "nameEn":  "Driving slowly without good and sufficient reason to impede normal traffic flow",
        "nameMr":  "सबळ कारणाशिवाय वाहन हळू चालवून वाहतुकीस अडथळा केला",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  190,
        "section":  "MVDR 17(2)/177A MVA",
        "nameEn":  "Applying sudden brake without genuine reason",
        "nameMr":  "विना कारण अचानक गती रोधकाचा (ब्रेक) वापर केला",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  191,
        "section":  "MVDR 22(2)(n)/177A MVA",
        "nameEn":  "Parking the vehicle alongside another parked vehicle/ Double parking",
        "nameMr":  "दुसऱ्या मोटारवाहनाचे बाजुस वाहन उभे करणे (डबल पार्किंग)",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  192,
        "section":  "MVDR 22(2)(c)/177A MVA",
        "nameEn":  "Parking the vehicle on footpath / cycle track \u0026 zebra crossing",
        "nameMr":  "पदपथावर दुचाकी मार्गावर आणि पादचारी रस्त्यावर वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  193,
        "section":  "MVDR 22(2)(b)/177A MVA",
        "nameEn":  "Parking Vehicle on main road where notified speed limit is 50KM per hour or more",
        "nameMr":  "५० किमी वेग मर्यादा असलेल्या रस्त्यावर वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Speed \u0026 Racing"
    },
    {
        "sr":  194,
        "section":  "MVDR 22(2)(l)/177A MVA",
        "nameEn":  "Parking the vehicle opposite another MV or as obstruction to other vehicle",
        "nameMr":  "दुसऱ्या मोटारवाहनाच्या समोर वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  195,
        "section":  "MVDR 22(2)(s)/177A MVA",
        "nameEn":  "Parking the vehicle in \"No Parking\" area",
        "nameMr":  "‘‘उभे करू नये’’ क्षेत्रात वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  196,
        "section":  "MVDR 22(2)(s)/177A MVA",
        "nameEn":  "No Parking",
        "nameMr":  "वाहन लावण्यास मनाई",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  197,
        "section":  "MVDR 22(2)(s)/177A MVA",
        "nameEn":  "NO PARKING (Clamping)",
        "nameMr":  "वाहन लावण्यास मनाई (क्लॅम्पिंग)",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  198,
        "section":  "MVDR 22(2)(k)/177A MVA",
        "nameEn":  "Parking the vehicle away from the edge of the footpath",
        "nameMr":  "पदपथाच्या किनाऱ्यापासून दूर वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  199,
        "section":  "MVDR 22(2)(f)/177A MVA",
        "nameEn":  "Parking the vehicle near bus stop / at educational institution / hospital entry or if blocking traffic sign",
        "nameMr":  "बस थांबा, शैक्षणिक संस्था, रुग्णालय प्रवेशद्वारावर किंवा वाहतूक चिन्हास अडथळा अशा प्रकारे वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  200,
        "section":  "MVDR 22(2)(a)/177A MVA",
        "nameEn":  "Parking the vehicle where stopping prohibited/Vehicle abandoned on road",
        "nameMr":  "थांबणे प्रतिबंधित ठिकाणी वाहन उभे करणे/ रस्त्यावर वाहन सोडून देणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  201,
        "section":  "MVDR 22(2)(g)/177A MVA",
        "nameEn":  "Parking the vehicle in a tunnel",
        "nameMr":  "बोगद्यात वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  202,
        "section":  "MVDR 22(2)(h)/177A MVA",
        "nameEn":  "Parking the vehicle in bus lane",
        "nameMr":  "बस मार्गिकेत वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  203,
        "section":  "MVDR 22(2)(i)/177A MVA",
        "nameEn":  "Parking the vehicle in front of entrance or exit of property",
        "nameMr":  "मालमत्ता आगमन किंवा निर्गमन द्वारा समोर वाहन उभे करणे.",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  204,
        "section":  "MVDR 22(2)(m)/177A MVA",
        "nameEn":  "Parking the vehicle obstructing other vehicle or cause inconvenience to any person",
        "nameMr":  "दुसऱ्या मोटारवाहनास अडथळा होईल असे वाहन उभे करणे किंवा इतर व्यक्तींना असुविधा होईल असे वाहन उभे करणे.",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  205,
        "section":  "MVDR 22(2)(d)/177A MVA",
        "nameEn":  "Parking Vehicle within 50 mtr from the edge of Junction or inter section",
        "nameMr":  "चौक किंवा छेद रस्त्याच्या किनाऱ्याच्या ५० मीटर आत वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  206,
        "section":  "MVDR 22(2)(j)/177A MVA",
        "nameEn":  "Park Vehicle on Continuous yellow line Painted on curve side on Road",
        "nameMr":  "सलग अखंडित पिवळ्या रंगाचा पट्टा आखलेला असता तेथे वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  207,
        "section":  "MVDR 22(2)(0)/177A MVA",
        "nameEn":  "Park Vehicle in permitted parking place beyond permitted time limit",
        "nameMr":  "निर्देशित वेळेनंतर वाहन उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  208,
        "section":  "MVDR 22(2)(P)/177A MVA",
        "nameEn":  "Parked vehicle is other than permitted specified Category",
        "nameMr":  "उभे केलेले वाहन हे विशिष्ट वर्गासाठीच्या परवाणगीपैकी नाही.",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  209,
        "section":  "MVDR 22(2)(R)/177A MVA",
        "nameEn":  "Not Parking Vehicle as designated in parking lot",
        "nameMr":  "उभे करण्यासाठीच्या गटासाठी निर्देशित केलेल्या प्रकारे वाहन उभे केले नाही",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  210,
        "section":  "MVDR 22(1)(v)/177A MVA",
        "nameEn":  "Stopping Vehicle on a level Crossing",
        "nameMr":  "रेल्वे ओलांडणी प्रतिबंधित क्षेत्रात वाहन थांबविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  211,
        "section":  "MVDR 22(1)(ix)/177A MVA",
        "nameEn":  "Stopping the vehicle at mandatory \"No stopping\" sign",
        "nameMr":  "थांबू नये (नो स्टॉपिंग) या आज्ञाधारक चिन्ह असलेल्या ठिकाणी वाहन थांबविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  212,
        "section":  "MVDR 20 (3)/177A MVA",
        "nameEn":  "Parking/Stopping vehicle in a tunnel without genuine reason",
        "nameMr":  "बोगद्याजवळ सबळ कारणाशिवाय वाहन थांबविणे/ उभे करणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  213,
        "section":  "MVDR 22(1)(i)/177A MVA",
        "nameEn":  "Stopping the vehicle at narrow road",
        "nameMr":  "अरुंद रस्त्यावर वाहन थांबविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  214,
        "section":  "MVDR 22(1) (ii)/177A MVA",
        "nameEn":  "Stopping the vehicle near or on a sharp bend",
        "nameMr":  "तीव्र वळणावर किंवा जवळ वाहन थांबविणे.",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  215,
        "section":  "MVDR 22(1) (iii)/177A MVA",
        "nameEn":  "Stopping Vehicle in an acceleration /Deceleration lane",
        "nameMr":  "चढण / उतार मार्गिकेत वाहन थांबविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  216,
        "section":  "MVDR 22(1)(iv)/177A MVA",
        "nameEn":  "Stopping the vehicle on 5 meters before pedestrian crossing",
        "nameMr":  "पादचारी सारणी पासून पाच मिटर अंतराच्या आत वाहन थांबविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  217,
        "section":  "MVDR 22(1)(vi)/177A MVA",
        "nameEn":  "Stopping Vehicle 5 Mtrs or less before light signal or \"GIVE WAY\" or \"STOP SIGN\"",
        "nameMr":  "‘‘मार्ग द्या’’ (गिव्ह वे) ‘‘थांबा चिन्ह’’ (स्टॉप साईन) किंवा प्रकाश संकेत (लाईट सिग्नल) च्या पाच मिटर अंतराचे आत वाहन थांबविणे.",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Dangerous \u0026 Signal"
    },
    {
        "sr":  218,
        "section":  "MVDR 22(1)(vii)/177A MVA",
        "nameEn":  "Stopping the vehicle at bus stand when vehicle is other than bus",
        "nameMr":  "बस थांब्यावर बस व्यतिरिक्त इतर वाहने थांबविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  219,
        "section":  "MVDR 22(1)(viii)/177A MVA",
        "nameEn":  "Stopping Vehicle on yellow box marked on road",
        "nameMr":  "रस्त्यावर पिवळ्या पेटीत (बॉक्स) वाहन थांबविणे",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  220,
        "section":  "Sec 119/177 MVA.",
        "nameEn":  "Mandatory traffic sign boards not obeyed",
        "nameMr":  "आज्ञादर्शक वाहतूक चिन्ह फलकाचे अनुपालन केले नाही",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "General"
    },
    {
        "sr":  221,
        "section":  "MMVR 21(12)/177",
        "nameEn":  "Demanding excess fare from the passenger",
        "nameMr":  "प्रवाशांकडून जादा भाड्याची मागणी",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  222,
        "section":  "CMVR 104(1) (i \u0026 ii)/177 MVA",
        "nameEn":  "Goods Carrier MV without white reflector at front",
        "nameMr":  "माल वाहतुक मोटार वाहनांस पुढील भागास पांढरा परावर्तक नसता",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  223,
        "section":  "CMVR 104(1) (iii)/177 MVA",
        "nameEn":  "HMV Goods Carrier without reflective contour marking at rear and both the sides",
        "nameMr":  "अवजड माल वाहतुक मोटार वाहनाच्या पाठीमागे व सभोवताली विनापरावर्तक पररेषा दर्शक",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "General"
    },
    {
        "sr":  224,
        "section":  "CMVR 104(1) (iv)/177 MVA",
        "nameEn":  "Passenger Carrier MV without reflectors at front - white, both side - yellow \u0026 rear - red",
        "nameMr":  "प्रवासी वाहतुक मोटार वाहनाच्या पुढे - पांढरा, दोन्ही बाजूंस पिवळी व पाठीमागे लाल परावर्तक नसता",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  225,
        "section":  "CMVR 104(1) (v)/177 MVA",
        "nameEn":  "Rickshaw, 3 wheeler Goods Carrier, e-Rickshaw, e-Cart without white reflector tape at front \u0026 red reflector tape at rear",
        "nameMr":  "रिक्षा, तीनचाकी मालवाहक, ई-रिक्षा, ई-कार्ट च्या पुढील भागात पांढरी तर पाठीमागे लाल परावर्तित पट्टी बसवलेली नसता",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  226,
        "section":  "CMVR 138(4)(C)/177 MVA",
        "nameEn":  "M-1 = 9+1 or more seating capacity or gross vehicle weight exceeding five tonnes Passenger Carrier MV shall be fitted with white at front \u0026 red at rear retro-reflective triangles.",
        "nameMr":  "M-1 = 9+1 किंवा जास्त आसन क्षमता किंवा स्थूळ वजन पाच टनापेक्षा जास्त प्रवासी वाहनाच्या पुढे पांढरा तर पाठीमागे लाल परावर्तक त्रिकोण दर्शित असावा",
        "fine":  "1,000",
        "repeatFine":  "1,000",
        "category":  "Cabs \u0026 Commercial"
    },
    {
        "sr":  227,
        "section":  "Sec 99/117 MPA 1951",
        "nameEn":  "U-turn at prohibited U turn place. (Deviation)",
        "nameMr":  "युटर्न प्रतिबंधित ठीकाणी वाहनाने युटर्न घेतला (योग्य रस्ता सोडून देणे)",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  228,
        "section":  "Sec 99/117 MPA 1951",
        "nameEn":  "No entry / One way Traffic Signs violated by the vehicle driver (Deviation)",
        "nameMr":  "प्रवेश प्रतिबंधित/एक दिशा मार्ग वाहतुक चिन्हाचे वाहन चालकाने उल्लंघन केले",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  229,
        "section":  "Sec 99/117 MPA 1951",
        "nameEn":  "Vehicle driver failed to drive vehicle on left side of the road",
        "nameMr":  "वाहन चालकाने रस्त्याच्या डाव्या बाजूने वाहन चालविले नाही",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  230,
        "section":  "Sec 99/117 MPA 1951",
        "nameEn":  "Vehicle driver overtook other vehicle or motor vehicle from left side",
        "nameMr":  "वाहन चालकाने पुढील वाहनाच्या/मोटार वाहनाच्या डाव्या बाजूने ओव्हर टेक केले",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Court Cognizable"
    },
    {
        "sr":  231,
        "section":  "Sec 103/117 MPA 1951",
        "nameEn":  "Vehicle driver drew or parked vehicle on footpath",
        "nameMr":  "वाहन चालकाने आपले वाहन फूटपाथ वर चालविले किंवा उभे केले",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  232,
        "section":  "Sec 102/117 MPA 1951",
        "nameEn":  "Parked vehicle at Public place causing obstructions to other road users",
        "nameMr":  "सार्वजनिक ठीकाणी वाहन उभे करून रस्ते वापरणारे इतर व्यक्तींना अडथळा निर्माण केला",
        "fine":  "Court",
        "repeatFine":  "Non-Compoundable",
        "category":  "Parking \u0026 Stopping"
    },
    {
        "sr":  233,
        "section":  "CMVR 108(4)/177 MVA",
        "nameEn":  "Use of multi-coloured red, blue and white light shall be permitted only on vehicles specifically designated for emergency duties and shall be specifically specified by State Governments",
        "nameMr":  "बहु-रंगीत लाल, निळा आणि पांढरा दिवा वापराची परवानगी केवळ आणीबाणीच्या कर्तव्यांसाठी विशेषतः नियुक्त केलेल्या वाहनांवरच दिली जाईल",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Vehicle \u0026 Equipment"
    },
    {
        "sr":  234,
        "section":  "MMVR 18/177 MVA",
        "nameEn":  "Driver failed to update his new address within fourteen days. (Not applicable if change of residence period not exceeding 3 months)",
        "nameMr":  "चौदा दिवसांच्या आत ड्रायव्हरला त्याचा नवीन पत्ता अपडेट करता आला नाही.",
        "fine":  "500",
        "repeatFine":  "1,500",
        "category":  "Cabs \u0026 Commercial"
    }
];

