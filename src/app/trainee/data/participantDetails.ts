interface ParticipantDetails {
  [key: string]: {
    personalInfo: {
      name: string;
      gender: "Male" | "Female";
      age: number;
      education: string;
    };
    professionalInfo: {
      currentCompany: string;
      location: "Singapore" | "Malaysia" | "UAE";
      currentPosition: string;
      companyType: "Tourism Agency";
      experience: string;
    };
    programProgress: {
      onboard: {
        status: "completed" | "in progress" | "pending";
      };
      training: {
        status: "completed" | "in progress" | "pending";
      };
      evaluation: {
        status: "completed" | "in progress" | "pending";
      };
      employed: {
        status: "completed" | "in progress" | "pending";
      };
    };
    performance: {
      attendance: number;
      rating: number;
    };
    boardingDetails: {
      from: string;
      to: "UAE";
    };
  };
}

export const participantDetails: ParticipantDetails = {
    "1": {
        "personalInfo": {
            "name": "Ahmad Al-Ahmad",
            "gender": "Female",
            "age": 32,
            "education": "Bachelor in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "Singapore",
            "currentPosition": "Destination Specialist",
            "companyType": "Tourism Agency",
            "experience": "7 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 73,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Jurong East",
            "to": "UAE"
        }
    },
    "2": {
        "personalInfo": {
            "name": "Sarah Smith",
            "gender": "Male",
            "age": 26,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "Discovery Tours",
            "location": "Singapore",
            "currentPosition": "Business Development Manager",
            "companyType": "Tourism Agency",
            "experience": "9 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 81,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Singapore",
            "to": "UAE"
        }
    },
    "3": {
        "personalInfo": {
            "name": "Mohammed Hassan",
            "gender": "Male",
            "age": 27,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "Malaysia",
            "currentPosition": "Travel Consultant",
            "companyType": "Tourism Agency",
            "experience": "15 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 97,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "4": {
        "personalInfo": {
            "name": "Fatima Al-Sayed",
            "gender": "Male",
            "age": 29,
            "education": "Master in Marketing"
        },
        "professionalInfo": {
            "currentCompany": "Sands Tourism",
            "location": "UAE",
            "currentPosition": "Tourism Officer",
            "companyType": "Tourism Agency",
            "experience": "12 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 91,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Dubai",
            "to": "UAE"
        }
    },
    "5": {
        "personalInfo": {
            "name": "John Miller",
            "gender": "Female",
            "age": 31,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "Desert Adventures",
            "location": "UAE",
            "currentPosition": "Travel Consultant",
            "companyType": "Tourism Agency",
            "experience": "15 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 67,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Sharjah",
            "to": "UAE"
        }
    },
    "6": {
        "personalInfo": {
            "name": "Aisha Abdullah",
            "gender": "Male",
            "age": 40,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Travel & Tourism Co.",
            "location": "Singapore",
            "currentPosition": "Travel Consultant",
            "companyType": "Tourism Agency",
            "experience": "6 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 89,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Jurong East",
            "to": "UAE"
        }
    },
    "7": {
        "personalInfo": {
            "name": "Omar Khalil",
            "gender": "Male",
            "age": 44,
            "education": "Master in Marketing"
        },
        "professionalInfo": {
            "currentCompany": "Arabian Journeys",
            "location": "Singapore",
            "currentPosition": "Operations Manager",
            "companyType": "Tourism Agency",
            "experience": "10 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "in progress"
            },
            "training": {
                "status": "pending"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 93,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Singapore",
            "to": "UAE"
        }
    },
    "8": {
        "personalInfo": {
            "name": "Lisa Anderson",
            "gender": "Female",
            "age": 25,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "Singapore",
            "currentPosition": "Tourism Officer",
            "companyType": "Tourism Agency",
            "experience": "14 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 74,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Sentosa",
            "to": "UAE"
        }
    },
    "9": {
        "personalInfo": {
            "name": "Zainab Al-Ali",
            "gender": "Female",
            "age": 44,
            "education": "Master in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Gulf Tours & Travel",
            "location": "Malaysia",
            "currentPosition": "Tourism Officer",
            "companyType": "Tourism Agency",
            "experience": "10 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 70,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "10": {
        "personalInfo": {
            "name": "Thomas Wilson",
            "gender": "Female",
            "age": 28,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Heritage Explorers",
            "location": "Malaysia",
            "currentPosition": "Customer Service Manager",
            "companyType": "Tourism Agency",
            "experience": "2 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 83,
            "rating": 3
        },
        "boardingDetails": {
            "from": "George Town",
            "to": "UAE"
        }
    },
    "11": {
        "personalInfo": {
            "name": "Mariam Hussein",
            "gender": "Female",
            "age": 42,
            "education": "Bachelor in Business"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "Singapore",
            "currentPosition": "Sales Director",
            "companyType": "Tourism Agency",
            "experience": "5 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 73,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Jurong East",
            "to": "UAE"
        }
    },
    "12": {
        "personalInfo": {
            "name": "David Brown",
            "gender": "Female",
            "age": 41,
            "education": "Master in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Gulf Tours & Travel",
            "location": "Singapore",
            "currentPosition": "Operations Manager",
            "companyType": "Tourism Agency",
            "experience": "16 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 75,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Sentosa",
            "to": "UAE"
        }
    },
    "13": {
        "personalInfo": {
            "name": "Noura Al-Mazrouei",
            "gender": "Female",
            "age": 32,
            "education": "Bachelor in Hospitality"
        },
        "professionalInfo": {
            "currentCompany": "Emirates Experience",
            "location": "Malaysia",
            "currentPosition": "Program Coordinator",
            "companyType": "Tourism Agency",
            "experience": "8 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 89,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "14": {
        "personalInfo": {
            "name": "James Taylor",
            "gender": "Male",
            "age": 40,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "Gulf Tours & Travel",
            "location": "Singapore",
            "currentPosition": "Program Coordinator",
            "companyType": "Tourism Agency",
            "experience": "12 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "in progress"
            },
            "training": {
                "status": "pending"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 87,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Jurong East",
            "to": "UAE"
        }
    },
    "15": {
        "personalInfo": {
            "name": "Layla Al-Hashimi",
            "gender": "Female",
            "age": 35,
            "education": "Master in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Sands Tourism",
            "location": "Singapore",
            "currentPosition": "Tour Guide",
            "companyType": "Tourism Agency",
            "experience": "7 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 91,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Sentosa",
            "to": "UAE"
        }
    },
    "16": {
        "personalInfo": {
            "name": "Peter Johnson",
            "gender": "Female",
            "age": 32,
            "education": "Bachelor in Business"
        },
        "professionalInfo": {
            "currentCompany": "Oasis Travels",
            "location": "Malaysia",
            "currentPosition": "Tour Guide",
            "companyType": "Tourism Agency",
            "experience": "14 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "in progress"
            },
            "training": {
                "status": "pending"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 76,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Kuala Lumpur",
            "to": "UAE"
        }
    },
    "17": {
        "personalInfo": {
            "name": "Hessa Al-Falasi",
            "gender": "Female",
            "age": 31,
            "education": "Bachelor in Marketing"
        },
        "professionalInfo": {
            "currentCompany": "Heritage Explorers",
            "location": "Malaysia",
            "currentPosition": "Program Coordinator",
            "companyType": "Tourism Agency",
            "experience": "14 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "in progress"
            },
            "training": {
                "status": "pending"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 78,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "18": {
        "personalInfo": {
            "name": "Michael Davis",
            "gender": "Male",
            "age": 27,
            "education": "Bachelor in Marketing"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "Malaysia",
            "currentPosition": "Sales Director",
            "companyType": "Tourism Agency",
            "experience": "16 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 78,
            "rating": 3
        },
        "boardingDetails": {
            "from": "George Town",
            "to": "UAE"
        }
    },
    "19": {
        "personalInfo": {
            "name": "Reem Al-Suwaidi",
            "gender": "Female",
            "age": 40,
            "education": "Bachelor in Marketing"
        },
        "professionalInfo": {
            "currentCompany": "Desert Adventures",
            "location": "UAE",
            "currentPosition": "Marketing Manager",
            "companyType": "Tourism Agency",
            "experience": "15 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 84,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Sharjah",
            "to": "UAE"
        }
    },
    "20": {
        "personalInfo": {
            "name": "Robert Martin",
            "gender": "Male",
            "age": 43,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "Emirates Experience",
            "location": "Malaysia",
            "currentPosition": "Event Coordinator",
            "companyType": "Tourism Agency",
            "experience": "12 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 66,
            "rating": 4
        },
        "boardingDetails": {
            "from": "George Town",
            "to": "UAE"
        }
    },
    "21": {
        "personalInfo": {
            "name": "Amina Al-Zaabi",
            "gender": "Female",
            "age": 30,
            "education": "Master in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "UAE Tourism Plus",
            "location": "Singapore",
            "currentPosition": "Operations Manager",
            "companyType": "Tourism Agency",
            "experience": "2 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 97,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Singapore",
            "to": "UAE"
        }
    },
    "22": {
        "personalInfo": {
            "name": "William Thompson",
            "gender": "Female",
            "age": 41,
            "education": "Bachelor in Business"
        },
        "professionalInfo": {
            "currentCompany": "Discovery Tours",
            "location": "Malaysia",
            "currentPosition": "Tourism Officer",
            "companyType": "Tourism Agency",
            "experience": "12 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 67,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "23": {
        "personalInfo": {
            "name": "Maha Al-Mansoori",
            "gender": "Female",
            "age": 39,
            "education": "Bachelor in Hospitality"
        },
        "professionalInfo": {
            "currentCompany": "Gulf Tours & Travel",
            "location": "Singapore",
            "currentPosition": "Program Coordinator",
            "companyType": "Tourism Agency",
            "experience": "10 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 87,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Singapore",
            "to": "UAE"
        }
    },
    "24": {
        "personalInfo": {
            "name": "Richard Garcia",
            "gender": "Male",
            "age": 35,
            "education": "Bachelor in Hospitality"
        },
        "professionalInfo": {
            "currentCompany": "UAE Tourism Plus",
            "location": "Malaysia",
            "currentPosition": "Tourism Officer",
            "companyType": "Tourism Agency",
            "experience": "9 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 82,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "25": {
        "personalInfo": {
            "name": "Latifa Al-Qubaisi",
            "gender": "Female",
            "age": 28,
            "education": "Master in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "UAE Tourism Plus",
            "location": "Singapore",
            "currentPosition": "Business Development Manager",
            "companyType": "Tourism Agency",
            "experience": "2 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 77,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Sentosa",
            "to": "UAE"
        }
    },
    "26": {
        "personalInfo": {
            "name": "Joseph Martinez",
            "gender": "Female",
            "age": 40,
            "education": "Bachelor in Business"
        },
        "professionalInfo": {
            "currentCompany": "Global Tours LLC",
            "location": "Malaysia",
            "currentPosition": "Customer Service Manager",
            "companyType": "Tourism Agency",
            "experience": "16 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 93,
            "rating": 4
        },
        "boardingDetails": {
            "from": "George Town",
            "to": "UAE"
        }
    },
    "27": {
        "personalInfo": {
            "name": "Shamsa Al-Dhaheri",
            "gender": "Male",
            "age": 33,
            "education": "Master in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "UAE Tourism Plus",
            "location": "Malaysia",
            "currentPosition": "Tourism Officer",
            "companyType": "Tourism Agency",
            "experience": "6 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 74,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "28": {
        "personalInfo": {
            "name": "Daniel Robinson",
            "gender": "Female",
            "age": 39,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Travel & Tourism Co.",
            "location": "UAE",
            "currentPosition": "Customer Service Manager",
            "companyType": "Tourism Agency",
            "experience": "4 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 89,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Dubai",
            "to": "UAE"
        }
    },
    "29": {
        "personalInfo": {
            "name": "Maitha Al-Shamsi",
            "gender": "Male",
            "age": 29,
            "education": "Master in Marketing"
        },
        "professionalInfo": {
            "currentCompany": "Sands Tourism",
            "location": "Malaysia",
            "currentPosition": "Destination Specialist",
            "companyType": "Tourism Agency",
            "experience": "8 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 83,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "30": {
        "personalInfo": {
            "name": "Christopher Lee",
            "gender": "Female",
            "age": 31,
            "education": "Bachelor in Business"
        },
        "professionalInfo": {
            "currentCompany": "Oasis Travels",
            "location": "UAE",
            "currentPosition": "Tour Guide",
            "companyType": "Tourism Agency",
            "experience": "4 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "in progress"
            },
            "training": {
                "status": "pending"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 69,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Abu Dhabi",
            "to": "UAE"
        }
    },
    "31": {
        "personalInfo": {
            "name": "Sheikha Al-Ketbi",
            "gender": "Male",
            "age": 38,
            "education": "Bachelor in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Emirates Experience",
            "location": "Malaysia",
            "currentPosition": "Sales Director",
            "companyType": "Tourism Agency",
            "experience": "6 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 72,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Penang",
            "to": "UAE"
        }
    },
    "32": {
        "personalInfo": {
            "name": "Kevin Hall",
            "gender": "Female",
            "age": 27,
            "education": "Bachelor in Event Management"
        },
        "professionalInfo": {
            "currentCompany": "Heritage Explorers",
            "location": "Malaysia",
            "currentPosition": "Customer Service Manager",
            "companyType": "Tourism Agency",
            "experience": "11 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 86,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Johor Bahru",
            "to": "UAE"
        }
    },
    "33": {
        "personalInfo": {
            "name": "Lubna Al-Qasimi",
            "gender": "Male",
            "age": 37,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Sands Tourism",
            "location": "UAE",
            "currentPosition": "Event Coordinator",
            "companyType": "Tourism Agency",
            "experience": "10 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 84,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Umm Al Quwain",
            "to": "UAE"
        }
    },
    "34": {
        "personalInfo": {
            "name": "Edward Young",
            "gender": "Male",
            "age": 37,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Sands Tourism",
            "location": "UAE",
            "currentPosition": "Business Development Manager",
            "companyType": "Tourism Agency",
            "experience": "14 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 66,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Umm Al Quwain",
            "to": "UAE"
        }
    },
    "35": {
        "personalInfo": {
            "name": "Shamma Al-Mazrouei",
            "gender": "Male",
            "age": 39,
            "education": "Bachelor in Event Management"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "UAE",
            "currentPosition": "Destination Specialist",
            "companyType": "Tourism Agency",
            "experience": "4 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 65,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Umm Al Quwain",
            "to": "UAE"
        }
    },
    "36": {
        "personalInfo": {
            "name": "Brian King",
            "gender": "Female",
            "age": 40,
            "education": "Bachelor in Hospitality"
        },
        "professionalInfo": {
            "currentCompany": "Sands Tourism",
            "location": "UAE",
            "currentPosition": "Marketing Manager",
            "companyType": "Tourism Agency",
            "experience": "5 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 79,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Sharjah",
            "to": "UAE"
        }
    },
    "37": {
        "personalInfo": {
            "name": "Hamda Al-Suwaidi",
            "gender": "Male",
            "age": 29,
            "education": "Bachelor in Hospitality"
        },
        "professionalInfo": {
            "currentCompany": "UAE Tourism Plus",
            "location": "Singapore",
            "currentPosition": "Tour Guide",
            "companyType": "Tourism Agency",
            "experience": "16 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 93,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Jurong East",
            "to": "UAE"
        }
    },
    "38": {
        "personalInfo": {
            "name": "Steven Wright",
            "gender": "Male",
            "age": 27,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "Emirates Experience",
            "location": "UAE",
            "currentPosition": "Customer Service Manager",
            "companyType": "Tourism Agency",
            "experience": "15 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 94,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Dubai",
            "to": "UAE"
        }
    },
    "39": {
        "personalInfo": {
            "name": "Rawdha Al-Dhaheri",
            "gender": "Male",
            "age": 43,
            "education": "Bachelor in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Discovery Tours",
            "location": "Malaysia",
            "currentPosition": "Operations Manager",
            "companyType": "Tourism Agency",
            "experience": "8 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 77,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Penang",
            "to": "UAE"
        }
    },
    "40": {
        "personalInfo": {
            "name": "Ronald Hill",
            "gender": "Male",
            "age": 35,
            "education": "Bachelor in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Emirates Experience",
            "location": "Malaysia",
            "currentPosition": "Tourism Manager",
            "companyType": "Tourism Agency",
            "experience": "2 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 65,
            "rating": 4
        },
        "boardingDetails": {
            "from": "George Town",
            "to": "UAE"
        }
    },
    "41": {
        "personalInfo": {
            "name": "Afra Al-Muhairi",
            "gender": "Male",
            "age": 43,
            "education": "Bachelor in Business"
        },
        "professionalInfo": {
            "currentCompany": "Gulf Tours & Travel",
            "location": "UAE",
            "currentPosition": "Business Development Manager",
            "companyType": "Tourism Agency",
            "experience": "13 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 89,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Dubai",
            "to": "UAE"
        }
    },
    "42": {
        "personalInfo": {
            "name": "Timothy Scott",
            "gender": "Male",
            "age": 40,
            "education": "Bachelor in Marketing"
        },
        "professionalInfo": {
            "currentCompany": "Gulf Tours & Travel",
            "location": "Singapore",
            "currentPosition": "Event Coordinator",
            "companyType": "Tourism Agency",
            "experience": "4 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 69,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Sentosa",
            "to": "UAE"
        }
    },
    "43": {
        "personalInfo": {
            "name": "Mozah Al-Maktoum",
            "gender": "Female",
            "age": 27,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "Sands Tourism",
            "location": "UAE",
            "currentPosition": "Destination Specialist",
            "companyType": "Tourism Agency",
            "experience": "3 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 80,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Umm Al Quwain",
            "to": "UAE"
        }
    },
    "44": {
        "personalInfo": {
            "name": "Jeffrey Green",
            "gender": "Female",
            "age": 25,
            "education": "Bachelor in Hospitality"
        },
        "professionalInfo": {
            "currentCompany": "Gulf Tours & Travel",
            "location": "Malaysia",
            "currentPosition": "Operations Manager",
            "companyType": "Tourism Agency",
            "experience": "16 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "in progress"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 80,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Penang",
            "to": "UAE"
        }
    },
    "45": {
        "personalInfo": {
            "name": "Khawla Al-Nuaimi",
            "gender": "Female",
            "age": 43,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "Malaysia",
            "currentPosition": "Sales Director",
            "companyType": "Tourism Agency",
            "experience": "6 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 99,
            "rating": 4
        },
        "boardingDetails": {
            "from": "George Town",
            "to": "UAE"
        }
    },
    "46": {
        "personalInfo": {
            "name": "Gary Baker",
            "gender": "Female",
            "age": 41,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Emirates Experience",
            "location": "UAE",
            "currentPosition": "Marketing Manager",
            "companyType": "Tourism Agency",
            "experience": "5 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "in progress"
            },
            "training": {
                "status": "pending"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 73,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Sharjah",
            "to": "UAE"
        }
    },
    "47": {
        "personalInfo": {
            "name": "Salama Al-Kaabi",
            "gender": "Female",
            "age": 36,
            "education": "Master in Hospitality Management"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "UAE",
            "currentPosition": "Operations Manager",
            "companyType": "Tourism Agency",
            "experience": "14 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "completed"
            },
            "employed": {
                "status": "in progress"
            }
        },
        "performance": {
            "attendance": 88,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Sharjah",
            "to": "UAE"
        }
    },
    "48": {
        "personalInfo": {
            "name": "Larry Adams",
            "gender": "Male",
            "age": 36,
            "education": "Master in Business Administration"
        },
        "professionalInfo": {
            "currentCompany": "UAE Tourism Plus",
            "location": "Malaysia",
            "currentPosition": "Tourism Manager",
            "companyType": "Tourism Agency",
            "experience": "6 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 86,
            "rating": 3
        },
        "boardingDetails": {
            "from": "George Town",
            "to": "UAE"
        }
    },
    "49": {
        "personalInfo": {
            "name": "Meera Al-Ahbabi",
            "gender": "Female",
            "age": 33,
            "education": "Bachelor in Business"
        },
        "professionalInfo": {
            "currentCompany": "Falcon Adventures",
            "location": "UAE",
            "currentPosition": "Program Coordinator",
            "companyType": "Tourism Agency",
            "experience": "12 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "completed"
            },
            "training": {
                "status": "completed"
            },
            "evaluation": {
                "status": "in progress"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 94,
            "rating": 3
        },
        "boardingDetails": {
            "from": "Abu Dhabi",
            "to": "UAE"
        }
    },
    "50": {
        "personalInfo": {
            "name": "Dennis Nelson",
            "gender": "Female",
            "age": 29,
            "education": "Bachelor in Tourism"
        },
        "professionalInfo": {
            "currentCompany": "Desert Adventures",
            "location": "Malaysia",
            "currentPosition": "Travel Consultant",
            "companyType": "Tourism Agency",
            "experience": "13 Years"
        },
        "programProgress": {
            "onboard": {
                "status": "in progress"
            },
            "training": {
                "status": "pending"
            },
            "evaluation": {
                "status": "pending"
            },
            "employed": {
                "status": "pending"
            }
        },
        "performance": {
            "attendance": 98,
            "rating": 4
        },
        "boardingDetails": {
            "from": "Penang",
            "to": "UAE"
        }
    }
} as const;

// Export individual types for reuse
export type Participant = ParticipantDetails[string];
export type PersonalInfo = Participant['personalInfo'];
export type ProfessionalInfo = Participant['professionalInfo'];
export type ProgramProgress = Participant['programProgress'];
export type Performance = Participant['performance'];
export type BoardingDetails = Participant['boardingDetails']; 