import { useState, useEffect } from 'react'
import './App.css'

const locationData = {
  "Andhra Pradesh": ["Alluri Sitharama Raju", "Anakapalli", "Anantapur", "Bapatla", "Chittoor", "East Godavari", "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Nandyal", "NTR", "Palnadu", "Parvathipuram Manyam", "Prakasam", "Sri Sathya Sai", "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],

  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],

  "Assam": ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia"],

  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali"],

  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],

  "Goa": ["North Goa", "South Goa"],

  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],

  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],

  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],

  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],

  "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"],

  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],

  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Rewa", "Satna", "Dhar", "Dewas", "Ratlam", "Vidisha", "Chhindwara", "Shivpuri", "Morena", "Sehore", "Raisen", "Betul", "Narmadapuram", "Khandwa", "Khargone"],

  "Maharashtra": ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],

  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Senapati", "Tamenglong", "Thoubal", "Ukhrul"],

  "Meghalaya": ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "South Garo Hills", "West Garo Hills", "West Khasi Hills"],

  "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],

  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],

  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Cuttack", "Dhenkanal", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Keonjhar", "Khordha", "Koraput", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Sundargarh"],

  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar"],

  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],

  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],

  "Tamil Nadu": ["Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanniyakumari", "Karur", "Madurai", "Nagapattinam", "Namakkal", "Salem", "Thanjavur", "Theni", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore"],

  "Telangana": ["Adilabad", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Karimnagar", "Khammam", "Mahabubnagar", "Medak", "Medchal-Malkajgiri", "Nalgonda", "Nizamabad", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Warangal"],

  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],

  "Uttar Pradesh": ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Ayodhya", "Azamgarh", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bijnor", "Bulandshahr", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Gonda", "Gorakhpur", "Hamirpur", "Hardoi", "Hathras", "Jaunpur", "Jhansi", "Kanpur Nagar", "Lakhimpur Kheri", "Lucknow", "Mathura", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Shahjahanpur", "Sitapur", "Sonbhadra", "Sultanpur", "Varanasi"],

  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],

  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Medinipur", "Purba Medinipur", "Purulia", "South 24 Parganas"],

  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Lakshadweep"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
}

function analyseGrievance(text) {
  const complaint = text.toLowerCase()

  // Basic language detection for prototype
  const hasHindi = /[\u0900-\u097F]/.test(text)

  const language = hasHindi ? 'Hindi' : 'English'

  let category = 'General Grievance'
  let priority = 'NORMAL'

  // Demonstration-only keyword rules
  const urgentWords = [
    'threat',
    'threatened',
    'violence',
    'attack',
    'assault',
    'danger',
    'emergency',
    'धमकी',
    'हमला',
    'खतरा'
  ]

  const discriminationWords = [
    'discrimination',
    'caste',
    'caste-based',
    'जाति',
    'भेदभाव'
  ]

  const propertyWords = [
    'property',
    'land',
    'house',
    'भूमि',
    'जमीन',
    'घर'
  ]

  const humiliationWords = [
    'insult',
    'abuse',
    'humiliated',
    'humiliation',
    'अपमान',
    'गाली'
  ]

  if (urgentWords.some(word => complaint.includes(word))) {
    priority = 'HIGH'
  }

  if (discriminationWords.some(word => complaint.includes(word))) {
    category = 'Caste-based Discrimination'
  } else if (propertyWords.some(word => complaint.includes(word))) {
    category = 'Property / Land Related Grievance'
  } else if (humiliationWords.some(word => complaint.includes(word))) {
    category = 'Harassment / Humiliation'
  }

  let summary =
    'The grievance has been received and requires review by an authorised official.'

  if (priority === 'HIGH') {
    summary =
      'The grievance contains indicators that may require urgent attention. Priority review by an authorised official is recommended.'
  } else if (category !== 'General Grievance') {
    summary =
      `The grievance contains information associated with ${category.toLowerCase()}. Review and classification by an authorised official is recommended.`
  }

  return {
    language,
    category,
    priority,
    summary
  }
}

const assessmentQuestions = [
  {
    question:
      "Do you feel physically safe right now in your current environment?",
    reverse: true
  },
  {
    question:
      "Do you find yourself constantly on edge, easily startled, or frequently looking out for danger?"
  },
  {
    question:
      "Are you able to focus on your work, school, or daily routines, or has that become very difficult?"
  },
  {
    question:
      "Have you been relying more on alcohol, smoking, or medications to cope with emotional distress?"
  },
  {
    question:
      "Are you actively avoiding friends, family, or people who care about you?"
  },
  {
    question:
      "Do you feel that your situation is unlikely to improve?"
  },
  {
    question:
      "Has it become very difficult for you to trust people around you since the incident?"
  },
  {
    question:
      "Do you feel physically exhausted much of the time, even when you manage to sleep?"
  },
  {
    question:
      "Do you find yourself frequently blaming yourself for what happened?"
  },
  {
    question:
      "Are you spending a lot of energy pretending to be okay in front of others?"
  }
]

function App() {
  const [page, setPage] = useState('home')

  const [grievance, setGrievance] = useState(() => {
  const saved = localStorage.getItem('nhaaGrievance')

  return saved
    ? JSON.parse(saved)
    : {
        name: '',
        mobile: '',
        state: '',
        district: '',
        description: '',
        consent: false
      }
})

  const [grievanceId, setGrievanceId] = useState(
  () => localStorage.getItem('nhaaGrievanceId') || ''
)
  const [trackingId, setTrackingId] = useState('')
  const [trackSource, setTrackSource] = useState('routing')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedCase, setSelectedCase] = useState(null)
  const [caseStatus, setCaseStatus] = useState('')
  const [officerRemark, setOfficerRemark] = useState('')
  const [caseRemarks, setCaseRemarks] = useState(() => {
  const saved = localStorage.getItem('nhaaCaseRemarks')
  return saved ? JSON.parse(saved) : {}
})
  const [caseUpdatedTimes, setCaseUpdatedTimes] = useState(() => {
  const saved = localStorage.getItem('nhaaCaseUpdatedTimes')
  return saved ? JSON.parse(saved) : {}
})
const [caseHistory, setCaseHistory] = useState(() => {
  const saved = localStorage.getItem('nhaaCaseHistory')
  return saved ? JSON.parse(saved) : {}
})
  const [dashboardFilter, setDashboardFilter] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [caseStatuses, setCaseStatuses] = useState(() => {
  const saved = localStorage.getItem('nhaaCaseStatuses')
  return saved ? JSON.parse(saved) : {}
})
  useEffect(() => {
  if (grievanceId) {
    localStorage.setItem('nhaaGrievanceId', grievanceId)
  }
}, [grievanceId])
useEffect(() => {
  localStorage.setItem(
    'nhaaGrievance',
    JSON.stringify(grievance)
  )
}, [grievance])

useEffect(() => {
  localStorage.setItem(
    'nhaaCaseStatuses',
    JSON.stringify(caseStatuses)
  )
}, [caseStatuses])

useEffect(() => {
  localStorage.setItem(
    'nhaaCaseUpdatedTimes',
    JSON.stringify(caseUpdatedTimes)
  )
}, [caseUpdatedTimes])

useEffect(() => {
  localStorage.setItem(
    'nhaaCaseHistory',
    JSON.stringify(caseHistory)
  )
}, [caseHistory])

useEffect(() => {
  localStorage.setItem(
    'nhaaCaseRemarks',
    JSON.stringify(caseRemarks)
  )
}, [caseRemarks])

const [assessmentAnswers, setAssessmentAnswers] = useState(() => {
  const saved = localStorage.getItem('nhaaAssessmentAnswers')

  return saved
    ? JSON.parse(saved)
    : Array(assessmentQuestions.length).fill(null)
})

useEffect(() => {
  localStorage.setItem(
    'nhaaAssessmentAnswers',
    JSON.stringify(assessmentAnswers)
  )
}, [assessmentAnswers])

  const routeGrievance = () => {
    const id =
      'NHAA-' +
      new Date().getFullYear() +
      '-' +
      Math.floor(100000 + Math.random() * 900000)

    setGrievanceId(id)
    setPage('routing')
  }

  const analysis = analyseGrievance(grievance.description)
  const calculateAssessmentResult = () => {
  let score = 0

  assessmentAnswers.forEach((answer, index) => {
    if (answer === null) return

    // Question 1 is reverse scored:
    // Always feeling safe = lower concern
    if (index === 0) {
      score += 4 - answer
    } else {
      score += answer
    }
  })

  let level = 'LOW'
let message =
  'Your responses indicate a lower level of concern.'

if (score >= 32) {
  level = 'CRITICAL'
  message =
    'Your responses indicate a critical level of concern. Prompt review by an authorised official is recommended.'
} else if (score >= 24) {
  level = 'HIGH'
  message =
    'Your responses indicate a high level of concern. Priority review by an authorised official is recommended.'
} else if (score >= 14) {
  level = 'MODERATE'
  message =
    'Your responses indicate a moderate level of concern and should be reviewed by an authorised official.'
}
  return {
    score,
    level,
    message
  }
}

const assessmentResult = calculateAssessmentResult()
const allCurrentStatuses = [
  caseStatuses['NHAA-2026-381204'] || 'Pending Review',
  caseStatuses['NHAA-2026-294781'] || 'In Progress',
  caseStatuses['NHAA-2026-174530'] || 'Resolved'
]

if (grievanceId) {
  allCurrentStatuses.push(
    caseStatuses[grievanceId] || 'Pending Review'
  )
}

const pendingCount = allCurrentStatuses.filter(
  status => status === 'Pending Review'
).length

const resolvedCount = allCurrentStatuses.filter(
  status => status === 'Resolved'
).length

let highConcernCount = 1

if (
  grievanceId &&
  (assessmentResult.level === 'HIGH' ||
    assessmentResult.level === 'CRITICAL')
) {
  highConcernCount = 2
}


if (page === 'assessmentResult') {
  return (
    <div className="assessment-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <div className="result-container">

        <div className="result-card">

          <p className="step-text">
            PRELIMINARY ASSESSMENT COMPLETE
          </p>

          <h1>Your Assessment Result</h1>

          <p className="result-subtitle">
            Based on the responses provided, the preliminary
            screening result is:
          </p>

          <div
            className={`risk-result ${assessmentResult.level.toLowerCase()}`}
          >
            <span>CONCERN LEVEL</span>
            <strong>{assessmentResult.level}</strong>
          </div>

          

          <div className="result-message">
            {assessmentResult.message}
          </div>

          

          <div className="result-disclaimer">
            This result is an automated preliminary screening based
            only on the responses provided. It is not a medical,
            psychological, or legal diagnosis. Final assessment and
            action remain with authorised officials.
          </div>

          <div className="result-actions">

            <button
              className="retake-btn"
              onClick={() => {
                setAssessmentAnswers(
                  Array(assessmentQuestions.length).fill(null)
                )
                setCurrentQuestion(0)
                setPage('assessment')
              }}
            >
              Retake Assessment
            </button>

            <button
              className="continue-register-btn"
              onClick={() => setPage('register')}
            >
              Continue to Register Grievance →
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

  if (page === 'assessment') {

  const question = assessmentQuestions[currentQuestion]

  const options = [
    { label: 'Never', value: 0 },
    { label: 'Rarely', value: 1 },
    { label: 'Sometimes', value: 2 },
    { label: 'Often', value: 3 },
    { label: 'Always', value: 4 }
  ]

  const selectAnswer = (value) => {
    const updatedAnswers = [...assessmentAnswers]
    updatedAnswers[currentQuestion] = value
    setAssessmentAnswers(updatedAnswers)
  }

  const nextQuestion = () => {
    if (assessmentAnswers[currentQuestion] === null) {
      alert('Please select an answer before continuing.')
      return
    }

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setPage('assessmentResult')
    }
  }

  return (
    <div className="assessment-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <div className="assessment-container">

        <div className="assessment-top">

          <span>
            Preliminary Assessment
          </span>

          <strong>
            Question {currentQuestion + 1} of {assessmentQuestions.length}
          </strong>

        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width:
                `${((currentQuestion + 1) /
                  assessmentQuestions.length) * 100}%`
            }}
          />
        </div>

        <div className="question-card">

          <div className="question-number">
            {currentQuestion + 1}
          </div>

          <h2>{question.question}</h2>

          <p className="question-help">
            Select the option that best reflects your experience.
          </p>

          <div className="answer-options">

            {options.map((option) => (

              <button
                key={option.value}
                className={
                  assessmentAnswers[currentQuestion] === option.value
                    ? 'answer-option selected-answer'
                    : 'answer-option'
                }
                onClick={() => selectAnswer(option.value)}
              >
                <span>{option.label}</span>

                <span className="option-circle">
                  {assessmentAnswers[currentQuestion] === option.value
                    ? '✓'
                    : ''}
                </span>

              </button>

            ))}

          </div>

          <div className="question-actions">

            <button
              className="previous-question-btn"
              disabled={currentQuestion === 0}
              onClick={() =>
                setCurrentQuestion(currentQuestion - 1)
              }
            >
              ← Previous
            </button>

            <button
              className="next-question-btn"
              onClick={nextQuestion}
            >
              {currentQuestion ===
              assessmentQuestions.length - 1
                ? 'View Assessment Result'
                : 'Next Question →'}
            </button>

          </div>

        </div>

        <p className="assessment-footer-note">
          Your responses are used only for preliminary screening
          within this prototype.
        </p>

      </div>

    </div>
  )
}

  if (page === 'assessmentIntro') {
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span
          className="logo"
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          NHAA
        </span>

        <span className="prototype-label">
          AI Assisted Grievance System — Prototype
        </span>
      </nav>

      <div className="assessment-intro-container">

  <button
    className="back-btn"
    onClick={() => setPage('login')}
  >
    ← Back
  </button>

  <div className="assessment-intro-card">

          <div className="assessment-icon">✓</div>

          <p className="step-text">
            PRELIMINARY ASSESSMENT
          </p>

          <h1>Before You Register</h1>

          <p className="assessment-intro-text">
            Please answer 10 short questions about how the incident
            has affected you. Your responses will help the system
            identify cases that may require earlier attention.
          </p>

          <div className="assessment-info-box">
            <strong>About this assessment</strong>

            <p>• Contains 10 questions</p>
            <p>• Takes approximately 2 minutes</p>
            <p>• Choose the response that best reflects your experience</p>
            <p>• Your responses form part of a preliminary screening only</p>
          </div>

          <div className="assessment-disclaimer">
            This screening does not provide a medical, psychological,
            or legal diagnosis. Final review and decisions remain with
            authorised officials.
          </div>

          <button
            className="start-assessment-btn"
            onClick={() => {
              setCurrentQuestion(0)
              setPage('assessment')
            }}
          >
            Start Assessment →
          </button>

        </div>

      </div>

    </div>
  )
}

  if (page === 'login') {
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span
          className="logo"
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          NHAA
        </span>

        <span className="prototype-label">
          AI Assisted Grievance System — Prototype
        </span>
      </nav>

      <div className="login-container">

        <button
          className="back-btn"
          onClick={() => setPage('home')}
        >
          ← Back to Home
        </button>

        <div className="login-card">

          <div className="login-heading">
            <p className="step-text">SECURE ACCESS</p>

            <h1>Citizen Login</h1>

            <p>
              Login to register and track your grievance securely.
            </p>
          </div>

          <div className="login-form">

            <label>Mobile Number</label>

            <input
              type="tel"
              placeholder="Enter your mobile number"
              maxLength="10"
            />

            <label>One-Time Password (OTP)</label>

            <input
              type="text"
              placeholder="Enter OTP"
              maxLength="6"
            />

            <button className="otp-btn">
              Send OTP
            </button>

            <button
              className="login-submit-btn"
              onClick={() => setPage('assessmentIntro')}
            >
              Login Securely
            </button>

          </div>

          <div className="login-security">
            🔒 Your information is handled confidentially and is
            accessible only to authorised personnel.
          </div>

          <p className="demo-login-note">
            Prototype demonstration — OTP verification is simulated.
          </p>

        </div>

      </div>

    </div>
  )
}

if (page === 'case' && selectedCase) {
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span className="logo">NHAA</span>

        <span className="prototype-label">
          Officer Review Portal — Prototype
        </span>
      </nav>

      <div className="analysis-container">

        <button
          className="back-btn"
          onClick={() => setPage('dashboard')}
        >
          ← Back to Dashboard
        </button>

        <p className="step-text">OFFICER CASE REVIEW</p>

        <h1>Review Grievance</h1>

        <p className="analysis-subtitle">
          Review the submitted grievance and preliminary screening
          information before recording an action.
        </p>

        <div className="analysis-grid">

          <div className="analysis-card">
            <span>Grievance ID</span>
            <strong>{selectedCase.id}</strong>
          </div>

          <div className="analysis-card">
            <span>Complainant Name</span>
            <strong>{selectedCase.name}</strong>
          </div>

          <div className="analysis-card">
            <span>Mobile Number</span>
            <strong>{selectedCase.mobile}</strong>
          </div>

          <div className="analysis-card">
            <span>Location</span>
            <strong>
              {selectedCase.district}, {selectedCase.state}
            </strong>
          </div>

          <div className="analysis-card">
            <span>Preliminary Category</span>
            <strong>{selectedCase.category}</strong>
          </div>

          <div
  className={`analysis-card concern-${selectedCase.concernLevel.toLowerCase()}`}
>
  <span>Preliminary Concern Level</span>
  <strong>{selectedCase.concernLevel}</strong>
</div>

          <div className="analysis-card">
  <span>Update Case Status</span>

  <select
    value={caseStatus || selectedCase.status}
    onChange={(e) => setCaseStatus(e.target.value)}
    className="status-select"
  >
    <option value="Pending Review">Pending Review</option>
    <option value="In Progress">In Progress</option>
    <option value="Resolved">Resolved</option>
  </select>
</div>

<div className="analysis-card officer-remark-card">
  <span>Officer Remark</span>

  <textarea
    value={officerRemark}
    onChange={(e) => setOfficerRemark(e.target.value)}
    placeholder="Add a short update or action note for this case..."
    rows="3"
    className="officer-remark-input"
  />
</div>

{caseUpdatedTimes[selectedCase.id] && (
  <div className="analysis-card">
    <span>Last Updated</span>
    <strong>{caseUpdatedTimes[selectedCase.id]}</strong>
  </div>
)}  

{caseRemarks[selectedCase.id] && (
  <div className="analysis-card">
    <span>Latest Officer Remark</span>
    <strong>{caseRemarks[selectedCase.id]}</strong>
  </div>
)}

{caseHistory[selectedCase.id] &&
  caseHistory[selectedCase.id].length > 0 && (
    <div className="case-history-card">
      <h3>Case Activity</h3>

      {caseHistory[selectedCase.id].map((item, index) => (
        <div className="history-item" key={index}>
          <div className="history-dot"></div>

          <div>
            <strong>{item.status}</strong>
            <p>{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  )}

        </div>

        <div className="summary-card">
          <h3>Grievance Description</h3>
          <p>{selectedCase.description}</p>
        </div>

        <div className="human-review">
          <strong>Officer Review Required</strong>
          <p>
            Preliminary screening information is provided only to
            assist review. Final classification and action must be
            determined by the authorised officer.
          </p>
        </div>
        <button
  className="submit-grievance"
  onClick={() => {
  const newStatus = caseStatus || selectedCase.status
  const updatedTime = new Date().toLocaleString('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

  setCaseStatuses({
    ...caseStatuses,
    [selectedCase.id]: newStatus
  })

  setCaseUpdatedTimes({
  ...caseUpdatedTimes,
  [selectedCase.id]: updatedTime
})

setCaseHistory({
  ...caseHistory,
  [selectedCase.id]: [
    ...(caseHistory[selectedCase.id] || []),
    {
      status: newStatus,
      time: updatedTime
    }
  ]
})

if (officerRemark.trim()) {
  setCaseRemarks({
    ...caseRemarks,
    [selectedCase.id]: officerRemark.trim()
  })
}

  setSelectedCase({
    ...selectedCase,
    status: newStatus
  })

  setOfficerRemark('')

  alert('Case status updated successfully.')
  setPage('dashboard')
}}
>
  Save Update
</button>

      </div>
    </div>
  )
}

const normalizedSearch = searchTerm.trim().toLowerCase()

const searchHasMatch =
  normalizedSearch === '' ||

  (
    grievanceId &&
    (
      grievanceId.toLowerCase().includes(normalizedSearch) ||
      grievance.district.toLowerCase().includes(normalizedSearch) ||
      grievance.state.toLowerCase().includes(normalizedSearch) ||
      analysis.category.toLowerCase().includes(normalizedSearch)
    )
  ) ||

  'NHAA-2026-381204'.toLowerCase().includes(normalizedSearch) ||
  'Jaipur'.toLowerCase().includes(normalizedSearch) ||
  'Rajasthan'.toLowerCase().includes(normalizedSearch) ||
  'General Grievance'.toLowerCase().includes(normalizedSearch) ||

  'NHAA-2026-294781'.toLowerCase().includes(normalizedSearch) ||
  'Lucknow'.toLowerCase().includes(normalizedSearch) ||
  'Uttar Pradesh'.toLowerCase().includes(normalizedSearch) ||
  'Caste-based Discrimination'.toLowerCase().includes(normalizedSearch) ||

  'NHAA-2026-174530'.toLowerCase().includes(normalizedSearch) ||
  'Pune'.toLowerCase().includes(normalizedSearch) ||
  'Maharashtra'.toLowerCase().includes(normalizedSearch) ||
  'Property / Land Related'.toLowerCase().includes(normalizedSearch)

  const searchText = searchTerm.trim().toLowerCase()

const matchesSearch = (id, district, state, category) => {
  if (searchText === '') return true

  return (
    id.toLowerCase().includes(searchText) ||
    district.toLowerCase().includes(searchText) ||
    state.toLowerCase().includes(searchText) ||
    category.toLowerCase().includes(searchText)
  )
}

let visibleCasesCount = 0

// Newly submitted citizen grievance
if (grievanceId) {
  const status = caseStatuses[grievanceId] || 'Pending Review'

  const matchesFilter =
    dashboardFilter === 'all' ||
    dashboardFilter === 'dashboard' ||
    (dashboardFilter === 'high' &&
      (assessmentResult.level === 'HIGH' ||
        assessmentResult.level === 'CRITICAL')) ||
    (dashboardFilter === 'pending' && status === 'Pending Review') ||
    (dashboardFilter === 'resolved' && status === 'Resolved')

  if (
    matchesFilter &&
    matchesSearch(
      grievanceId,
      grievance.district,
      grievance.state,
      analysis.category
    )
  ) {
    visibleCasesCount++
  }
}

// Jaipur
{
  const status =
    caseStatuses['NHAA-2026-381204'] || 'Pending Review'

  const matchesFilter =
    dashboardFilter === 'all' ||
    dashboardFilter === 'dashboard' ||
    (dashboardFilter === 'pending' && status === 'Pending Review') ||
    (dashboardFilter === 'resolved' && status === 'Resolved')

  if (
    matchesFilter &&
    matchesSearch(
      'NHAA-2026-381204',
      'Jaipur',
      'Rajasthan',
      'General Grievance'
    )
  ) {
    visibleCasesCount++
  }
}

// Lucknow
{
  const status =
    caseStatuses['NHAA-2026-294781'] || 'In Progress'

  const matchesFilter =
    dashboardFilter === 'all' ||
    dashboardFilter === 'dashboard' ||
    dashboardFilter === 'high' ||
    (dashboardFilter === 'pending' && status === 'Pending Review') ||
    (dashboardFilter === 'resolved' && status === 'Resolved')

  if (
    matchesFilter &&
    matchesSearch(
      'NHAA-2026-294781',
      'Lucknow',
      'Uttar Pradesh',
      'Caste-based Discrimination'
    )
  ) {
    visibleCasesCount++
  }
}

// Pune
{
  const status =
    caseStatuses['NHAA-2026-174530'] || 'Resolved'

  const matchesFilter =
    dashboardFilter === 'all' ||
    dashboardFilter === 'dashboard' ||
    (dashboardFilter === 'pending' && status === 'Pending Review') ||
    (dashboardFilter === 'resolved' && status === 'Resolved')

  if (
    matchesFilter &&
    matchesSearch(
      'NHAA-2026-174530',
      'Pune',
      'Maharashtra',
      'Property / Land Related'
    )
  ) {
    visibleCasesCount++
  }
}

if (page === 'dashboard') {
  return (
    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <h2>NHAA Officer Portal</h2>
          <p>Grievance Monitoring & Review Dashboard</p>
        </div>

        <div className="dashboard-header-actions">
  <button
    className="dashboard-home-btn"
    onClick={() => setPage('home')}
  >
    Citizen Portal
  </button>

  <button
    className="officer-logout-btn"
    onClick={() => {
      setSearchTerm('')
      setDashboardFilter('dashboard')
      setSelectedCase(null)
      setCaseStatus('')
      setOfficerRemark('')
      setPage('home')
    }}
  >
    Logout
  </button>
</div>
      </header>

      <div className="dashboard-layout">

        <aside className="sidebar">
          <div className="officer-profile">
            <div className="officer-avatar">AO</div>

            <div>
              <strong>Authorised Officer</strong>
              <span>District Administration</span>
            </div>
          </div>

          <nav className="side-nav">
            <button
  className={dashboardFilter === 'dashboard' ? 'active-side-item' : ''}
  onClick={() => setDashboardFilter('dashboard')}
>
  Dashboard
</button>

<button
  className={dashboardFilter === 'all' ? 'active-side-item' : ''}
  onClick={() => setDashboardFilter('all')}
>
  All Grievances
</button>

            <button
  className={dashboardFilter === 'high' ? 'active-side-item' : ''}
  onClick={() => setDashboardFilter('high')}
>
  High Concern
</button>

            <button
  className={dashboardFilter === 'pending' ? 'active-side-item' : ''}
  onClick={() => setDashboardFilter('pending')}
>
  Pending Review
</button>

            <button
  className={dashboardFilter === 'resolved' ? 'active-side-item' : ''}
  onClick={() => setDashboardFilter('resolved')}
>
  Resolved Cases
</button>
          </nav>

          <div className="prototype-sidebar-note">
            Demonstration Portal
          </div>
        </aside>

        <main className="dashboard-main">

          <div className="dashboard-title">
            <div>
              <p>OFFICER DASHBOARD</p>
              <h1>Grievance Overview</h1>
            </div>

            <div className="dashboard-date">
              Prototype System
            </div>
          </div>

          <div className="stat-grid">

            <div className="stat-card">
              <span>Total Grievances</span>
              <strong>{grievanceId ? '4' : '3'}</strong>
              <small>Registered cases</small>
            </div>

            <div className="stat-card urgent-stat">
  <span>High Concern</span>
  <strong>{highConcernCount}</strong>
  <small>Require attention</small>
</div>

            <div className="stat-card">
              <span>Pending Review</span>
              <strong>{pendingCount}</strong>
              <small>Awaiting officer action</small>
            </div>

            <div className="stat-card">
  <span>Resolved</span>

  <strong>{resolvedCount}</strong>




  <small>Closed cases</small>
</div>

          </div>

          <div className="cases-section">

            <div className="cases-heading">
              <div>
                <h2>
  {dashboardFilter === 'high'
    ? 'High Concern Grievances'
    : dashboardFilter === 'pending'
    ? 'Pending Review Grievances'
    : dashboardFilter === 'resolved'
    ? 'Resolved Grievances'
    : 'Recent Grievances'}
</h2>
                <p>
  {dashboardFilter === 'high'
    ? 'Cases requiring priority attention.'
    : dashboardFilter === 'pending'
    ? 'Cases awaiting officer review.'
    : dashboardFilter === 'resolved'
    ? 'Cases where action has been completed.'
    : 'Cases awaiting review and action.'}
</p>
              </div>

              <div className="cases-heading-actions">
  <input
    type="text"
    className="case-search-input"
    placeholder="Search ID, district or category..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <button
    className="filter-btn"
    onClick={() => {
      setDashboardFilter('all')
      setSearchTerm('')
    }}
  >
    View All Cases
  </button>
</div>
            </div>

            <div className="cases-table-wrapper">

              <table className="cases-table">

                <thead>
                  <tr>
                    <th>Grievance ID</th>
                    <th>Location</th>
                    <th>Category</th>
                    <th>Concern Level</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {grievanceId &&
  (
    (dashboardFilter === 'all' || dashboardFilter === 'dashboard') ||

    (dashboardFilter === 'high' &&
      (assessmentResult.level === 'HIGH' ||
        assessmentResult.level === 'CRITICAL')) ||

    (dashboardFilter === 'pending' &&
      (caseStatuses[grievanceId] || 'Pending Review') === 'Pending Review') ||

(dashboardFilter === 'resolved' &&
  (caseStatuses[grievanceId] || 'Pending Review') === 'Resolved')
  ) &&
(
  searchTerm.trim() === '' ||
  grievanceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  grievance.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
  grievance.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
  analysis.category.toLowerCase().includes(searchTerm.toLowerCase())
) && (
  
    <tr className="new-case-row">

                      <td>
                        <strong>{grievanceId}</strong>
                        <small>New submission</small>
                      </td>

                      <td>
                        {grievance.district},
                        <br />
                        {grievance.state}
                      </td>

                      <td>{analysis.category}</td>

                      <td>
  <span
    className={
      assessmentResult.level === 'HIGH' ||
      assessmentResult.level === 'CRITICAL'
        ? 'priority-badge high'
        : 'priority-badge normal'
    }
  >
    {assessmentResult.level}
  </span>
</td>

                      <td>
  <span
    className={
      (caseStatuses[grievanceId] || 'Pending Review') === 'Resolved'
        ? 'resolved-badge'
        : (caseStatuses[grievanceId] || 'Pending Review') === 'In Progress'
        ? 'progress-badge'
        : 'review-badge'
    }
  >
    {caseStatuses[grievanceId] || 'Pending Review'}
  </span>
</td>

                      <td>
                        <button
  className="review-case-btn"
  onClick={() => {
  setCaseStatus('')
  setOfficerRemark('')

  setSelectedCase({
      id: grievanceId,
      name: grievance.name,
      mobile: grievance.mobile,
      state: grievance.state,
      district: grievance.district,
      category: analysis.category,
      concernLevel: assessmentResult.level,
      description: grievance.description,
      status: caseStatuses[grievanceId] || 'Pending Review'
    })

    setPage('case')
  }}
>
  Review
</button>
                      </td>

                    </tr>
                  )}

{(
  (dashboardFilter === 'all' || dashboardFilter === 'dashboard') ||
  (dashboardFilter === 'pending' &&
    (caseStatuses['NHAA-2026-381204'] || 'Pending Review') === 'Pending Review') ||

(dashboardFilter === 'resolved' &&
  (caseStatuses['NHAA-2026-381204'] || 'Pending Review') === 'Resolved')
) &&
(
  searchTerm.trim() === '' ||
  'NHAA-2026-381204'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Jaipur'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Rajasthan'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'General Grievance'.toLowerCase().includes(searchTerm.toLowerCase())
) && (
  <tr>
                    <td>
                      <strong>NHAA-2026-381204</strong>
                    </td>
                    <td>Jaipur, Rajasthan</td>
                    <td>General Grievance</td>

                    <td>
                      <span className="priority-badge normal">
                        LOW
                      </span>
                    </td>

                    <td>
  <span
    className={
      (caseStatuses['NHAA-2026-381204'] || 'Pending Review') === 'Resolved'
        ? 'resolved-badge'
        : (caseStatuses['NHAA-2026-381204'] || 'Pending Review') === 'In Progress'
        ? 'progress-badge'
        : 'review-badge'
    }
  >
    {caseStatuses['NHAA-2026-381204'] || 'Pending Review'}
  </span>
</td>

                    <td>
                      <button
  className="review-case-btn"
  onClick={() => {
    setCaseStatus('')
    setOfficerRemark('')
    setSelectedCase({
      id: 'NHAA-2026-381204',
      name: 'Demo Complainant',
      mobile: 'XXXXXXXXXX',
      state: 'Rajasthan',
      district: 'Jaipur',
      category: 'General Grievance',
      concernLevel: 'LOW',
      description:
        'Demonstration grievance for officer review.',
      status: caseStatuses['NHAA-2026-381204'] || 'Pending Review'
    })

    setPage('case')
  }}
>
  Review
</button>
                    </td>
                  </tr>
)}

{(
  (dashboardFilter === 'all' || dashboardFilter === 'dashboard') ||
  dashboardFilter === 'high' ||
  (dashboardFilter === 'pending' &&
    (caseStatuses['NHAA-2026-294781'] || 'In Progress') === 'Pending Review') ||

(dashboardFilter === 'resolved' &&
  (caseStatuses['NHAA-2026-294781'] || 'In Progress') === 'Resolved')
) &&
(
  searchTerm.trim() === '' ||
  'NHAA-2026-294781'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Lucknow'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Uttar Pradesh'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Caste-based Discrimination'.toLowerCase().includes(searchTerm.toLowerCase())
) && (
  <tr>
                    <td>
                      <strong>NHAA-2026-294781</strong>
                    </td>
                    <td>Lucknow, Uttar Pradesh</td>
                    <td>Caste-based Discrimination</td>

                    <td>
                      <span className="priority-badge high">
                        HIGH
                      </span>
                    </td>

                    <td>
  <span
    className={
      (caseStatuses['NHAA-2026-294781'] || 'In Progress') === 'Resolved'
        ? 'resolved-badge'
        : (caseStatuses['NHAA-2026-294781'] || 'In Progress') === 'Pending Review'
        ? 'review-badge'
        : 'progress-badge'
    }
  >
    {caseStatuses['NHAA-2026-294781'] || 'In Progress'}
  </span>
</td>

                    <td>
                      <button
  className="review-case-btn"
  onClick={() => {
    setCaseStatus('')
    setOfficerRemark('')
    setSelectedCase({
      id: 'NHAA-2026-294781',
      name: 'Demo Complainant',
      mobile: 'XXXXXXXXXX',
      state: 'Uttar Pradesh',
      district: 'Lucknow',
      category: 'Caste-based Discrimination',
      concernLevel: 'HIGH',
      description:
        'Demonstration grievance for officer review.',
      status: caseStatuses['NHAA-2026-294781'] || 'In Progress'
    })

    setPage('case')
  }}
>
  Review
</button>
                    </td>
                  </tr>
)}

{(
  (dashboardFilter === 'all' || dashboardFilter === 'dashboard') ||
  (dashboardFilter === 'pending' &&
    (caseStatuses['NHAA-2026-174530'] || 'Resolved') === 'Pending Review') ||

(dashboardFilter === 'resolved' &&
  (caseStatuses['NHAA-2026-174530'] || 'Resolved') === 'Resolved')
) &&
(
  searchTerm.trim() === '' ||
  'NHAA-2026-174530'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Pune'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Maharashtra'.toLowerCase().includes(searchTerm.toLowerCase()) ||
  'Property / Land Related'.toLowerCase().includes(searchTerm.toLowerCase())
) && (
  <tr>
                    <td>
                      <strong>NHAA-2026-174530</strong>
                    </td>
                    <td>Pune, Maharashtra</td>
                    <td>Property / Land Related</td>

                    <td>
                      <span className="priority-badge normal">
                        LOW
                      </span>
                    </td>

                    <td>
  <span
    className={
      (caseStatuses['NHAA-2026-174530'] || 'Resolved') === 'Resolved'
        ? 'resolved-badge'
        : (caseStatuses['NHAA-2026-174530'] || 'Resolved') === 'In Progress'
        ? 'progress-badge'
        : 'review-badge'
    }
  >
    {caseStatuses['NHAA-2026-174530'] || 'Resolved'}
  </span>
</td>

                    <td>
                      <button
  className="review-case-btn"
  onClick={() => {
    setCaseStatus('')
    setOfficerRemark('')  

    setSelectedCase({
      id: 'NHAA-2026-174530',
      name: 'Demo Complainant',
      mobile: 'XXXXXXXXXX',
      state: 'Maharashtra',
      district: 'Pune',
      category: 'Property / Land Related',
      concernLevel: 'LOW',
      description: 'Demonstration grievance for officer review.',
      status: caseStatuses['NHAA-2026-174530'] || 'Resolved'
    })

    setPage('case')
  }}
>
  Review
</button>
                    </td>
                  </tr>
)}

{visibleCasesCount === 0 && (
  <tr>
    <td colSpan="6" className="no-cases-message">
      {searchTerm.trim()
        ? `No grievances found matching "${searchTerm}".`
        : 'No grievances found for this filter.'}
    </td>
  </tr>
)}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  )
}

if (page === 'trackLookup') {
  
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span
          className="logo"
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          NHAA
        </span>

        <span className="prototype-label">
          AI Assisted Grievance System — Prototype
        </span>
      </nav>

      <div className="track-lookup-container">

        <button
          className="back-btn"
          onClick={() => setPage('home')}
        >
          ← Back to Home
        </button>

        <div className="track-lookup-card">

          <p className="step-text">GRIEVANCE TRACKING</p>

          <h1>Track Your Grievance</h1>

          <p className="track-lookup-subtitle">
            Enter your grievance ID to view the current status
            of your grievance.
          </p>

          <div className="track-lookup-form">

            <label>Grievance ID</label>

            <input
              type="text"
              placeholder="e.g. NHAA-2026-123456"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />

            <button
              className="submit-grievance"
              onClick={() => {
                if (!trackingId.trim()) {
                  alert('Please enter your grievance ID.')
                  return
                }

                if (trackingId.trim() !== grievanceId) {
                  alert('Grievance ID not found in this prototype.')
                  return
                }

                setTrackSource('lookup')
setPage('track')
              }}
            >
              Track Grievance →
            </button>

          </div>

          <p className="demo-login-note">
  Prototype demonstration — tracking is available for
  grievances saved in this browser.
</p>

        </div>

      </div>

    </div>
  )
}

  if (page === 'track') {
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span
          className="logo"
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          NHAA
        </span>

        <span className="prototype-label">
          AI Assisted Grievance System — Prototype
        </span>
      </nav>

      <div className="track-container">

        <button
  className="back-btn"
  onClick={() =>
  setPage(trackSource === 'lookup' ? 'trackLookup' : 'routing')
}
>
  ← Back
</button>

        <div className="track-heading">
          <p className="step-text">GRIEVANCE TRACKING</p>
          <h1>Track Your Grievance</h1>
          <p>
            Current status and routing information for your registered
            grievance.
          </p>
        </div>

        <div className="track-id-card">
          <span>Grievance ID</span>
          <strong>{grievanceId}</strong>

          <div className="status-badge">
            <strong>
  {caseStatuses[grievanceId] || 'Pending Review'}
  {caseUpdatedTimes[grievanceId] && (
  <p className="tracking-updated-time">
    Last Updated: {caseUpdatedTimes[grievanceId]}
  </p>
)}


</strong>
          </div>
        </div>

        <div className="track-details">

          <div>
            <span>Complainant</span>
            <strong>{grievance.name}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>
              {grievance.district}, {grievance.state}
            </strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{analysis.category}</strong>
          </div>

          <div>
  <span>Preliminary Concern Level</span>

  <strong
    className={`concern-text ${assessmentResult.level.toLowerCase()}`}
  >
    {assessmentResult.level}
  </strong>
</div>

        </div>

        {caseRemarks[grievanceId] && (
  <div className="tracking-officer-remark">
    <div className="remark-icon">i</div>

    <div>
      <strong>Latest Officer Update</strong>
      <p>{caseRemarks[grievanceId]}</p>
    </div>
  </div>
)}

        <div className="tracking-timeline">

          <h2>Grievance Timeline</h2>

          <div className="timeline-item complete">
            <div className="timeline-dot">✓</div>

            <div>
              <strong>Grievance Registered</strong>
              <p>
                Your grievance was successfully registered in the
                system.
              </p>
            </div>
          </div>

          <div className="timeline-item complete">
            <div className="timeline-dot">✓</div>

            <div>
              <strong>Preliminary Screening Completed</strong>
              <p>
                The grievance was screened to assist with
                prioritisation and routing.
              </p>
            </div>
          </div>

          <div
  className={`timeline-item ${
    (caseStatuses[grievanceId] || 'Pending Review') === 'Pending Review'
      ? 'current'
      : 'complete'
  }`}
>
  <div className="timeline-dot">
    {(caseStatuses[grievanceId] || 'Pending Review') === 'Pending Review'
      ? '3'
      : '✓'}
  </div>

  <div>
    <strong>Officer Review</strong>
    <p>
      The grievance has been forwarded to the relevant
      district-level authorised officer for review.
    </p>
  </div>
</div>

          <div
  className={`timeline-item ${
    (caseStatuses[grievanceId] || 'Pending Review') === 'Resolved'
      ? 'complete'
      : (caseStatuses[grievanceId] || 'Pending Review') === 'In Progress'
      ? 'current'
      : ''
  }`}
>
  <div
  className={`timeline-dot ${
    (caseStatuses[grievanceId] || 'Pending Review') === 'Resolved'
      ? 'resolved-dot'
      : ''
  }`}
>
  {(caseStatuses[grievanceId] || 'Pending Review') === 'Resolved'
    ? '✓'
    : '4'}
</div>

  <div>
    <strong>Action / Resolution</strong>
    <p>
      {(caseStatuses[grievanceId] || 'Pending Review') === 'Resolved'
        ? 'The grievance has been marked as resolved by the authorised officer.'
        : 'Updates will appear here after action is recorded by the authorised official.'}
    </p>
  </div>
</div>

        </div>

        <div className="track-help">
          <strong>Need assistance?</strong>
          <p>
            Please contact the 24×7 helpline at <b>14566</b> and keep
            your grievance ID available.
          </p>
        </div>

      </div>

    </div>
  )
}

  if (page === 'routing') {
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span
          className="logo"
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          NHAA
        </span>

        <span className="prototype-label">
          AI Assisted Grievance System — Prototype
        </span>
      </nav>

      <div className="routing-container">

        <div className="success-icon">✓</div>

        <p className="step-text">STEP 3 OF 3</p>

        <h1>Grievance Registered</h1>

        <p className="routing-subtitle">
          The grievance has been registered and forwarded for
          authorised review.
        </p>

        <div className="grievance-id-box">
          <span>Your Grievance ID</span>
          <strong>{grievanceId}</strong>
          <small>
            Please save this ID to track the grievance.
          </small>
        </div>

        <div className="routing-details">

          <h2>Routing Details</h2>

          <div className="route-row">
            <span>State</span>
            <strong>{grievance.state}</strong>
          </div>

          <div className="route-row">
            <span>District</span>
            <strong>{grievance.district}</strong>
          </div>

          <div className="route-row">
            <span>Preliminary Category</span>
            <strong>{analysis.category}</strong>
          </div>

          

          <div className="route-row">
  <span>Preliminary Concern Level</span>

  <strong
    className={`concern-text ${assessmentResult.level.toLowerCase()}`}
  >
    {assessmentResult.level}
  </strong>
</div>

        </div>

        <div className="status-flow">

          <h2>Current Status</h2>

          <div className="status-items">

            <div className="status completed">
              <div>✓</div>
              <span>Registered</span>
            </div>

            <div className="status-line completed-line"></div>

            <div className="status completed">
              <div>✓</div>
              <span>Preliminary Screening</span>
            </div>

            <div className="status-line completed-line"></div>

            <div className="status active">
              <div>3</div>
              <span>Officer Review</span>
            </div>

            <div className="status-line"></div>

            <div className="status">
              <div>4</div>
              <span>Resolution</span>
            </div>

          </div>

        </div>

        <div className="routing-note">
          <strong>What happens next?</strong>
          <p>
            An authorised official will review the grievance and
            determine the appropriate action. Automated screening is
            used only to assist prioritisation and routing.
          </p>
        </div>

        <div className="routing-actions">

          <button
            className="secondary-btn analysis-button"
            onClick={() => setPage('home')}
          >
            Return Home
          </button>

          <button
  className="submit-grievance"
  onClick={() => {
    setTrackSource('routing')
    setPage('track')
  }}
>
  Track Grievance →
</button>

        </div>

      </div>
    </div>
  )
}

if (page === 'analysis') {
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span
          className="logo"
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          NHAA
        </span>

        <span className="prototype-label">
          AI Assisted Grievance System — Prototype
        </span>
      </nav>

      <div className="analysis-container">

        <p className="step-text">STEP 2 OF 3 • REVIEW & CONFIRM</p>

<h1>Review Your Grievance</h1>

<p className="analysis-subtitle">
  Please review the information below before submitting your grievance.
</p>

        

        <div className="analysis-grid">

  <div className="analysis-card">
    <span>Complainant Name</span>
    <strong>{grievance.name}</strong>
  </div>

  <div className="analysis-card">
    <span>Location</span>
    <strong>
      {grievance.district}, {grievance.state}
    </strong>
  </div>

  <div className="analysis-card">
    <span>Mobile Number</span>
    <strong>{grievance.mobile}</strong>
  </div>

  <div className={`analysis-card concern-${assessmentResult.level.toLowerCase()}`}>
    <span>Preliminary Concern Level</span>
    <strong>{assessmentResult.level}</strong>
  </div>

</div>

        <div className="summary-card">

  <h3>Grievance Description</h3>

  <p>
    {grievance.description}
  </p>

</div>

        <div className="human-review">

  <strong>Preliminary Screening Information</strong>

  <p>
    The concern level shown above is based on the preliminary
    assessment responses. It is intended only to assist prioritisation.
    Final review and action remain with authorised officials.
  </p>

</div>

        <div className="analysis-actions">
          <button
            className="secondary-btn analysis-button"
            onClick={() => setPage('register')}
          >
            ← Edit Grievance
          </button>

          <button
            className="submit-grievance"
            onClick={routeGrievance}
          >
            Confirm & Submit Grievance →
          </button>
        </div>

      </div>
    </div>
  )
}
  if (page === 'register') {
  return (
    <div className="form-page">

      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span
          className="logo"
          onClick={() => setPage('home')}
          style={{ cursor: 'pointer' }}
        >
          NHAA
        </span>

        <span className="prototype-label">
          AI Assisted Grievance System — Prototype
        </span>
      </nav>

      <div className="form-container">

        <button
  className="back-btn"
  onClick={() => setPage('assessmentResult')}
>
  ← Back
</button>

        <div className="form-heading">
          <p className="step-text">STEP 1 OF 3</p>
          <h1>Register a Grievance</h1>
          <p>
            Please provide the following information. Fields marked * are
            required.
          </p>
        </div>

        <form className="grievance-form">

          <div className="form-grid">

            <div className="form-group">
              <label>Full Name *</label>
              <input
  type="text"
  placeholder="Enter complainant's name"
  value={grievance.name}
  onChange={(e) =>
    setGrievance({ ...grievance, name: e.target.value })
  }
/>
            </div>

            <div className="form-group">
              <label>Mobile Number *</label>
<input
  type="tel"
  placeholder="Enter mobile number"
  value={grievance.mobile}
  onChange={(e) =>
    setGrievance({ ...grievance, mobile: e.target.value })
  }
/>
            </div>

            <div className="form-group">
              <label>State *</label>
<select
  value={grievance.state}
  onChange={(e) => {
    setGrievance({
      ...grievance,
      state: e.target.value,
      district: ''
    })
  }}
>
  <option value="">Select State / UT</option>

  {Object.keys(locationData).map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
</select>
            </div>

            <div className="form-group">
              <label>District *</label>
<select
  value={grievance.district}
  disabled={!grievance.state}
  onChange={(e) =>
    setGrievance({
      ...grievance,
      district: e.target.value
    })
  }
>
  <option value="">
    {grievance.state
      ? 'Select District'
      : 'Select State First'}
  </option>

  {grievance.state &&
    locationData[grievance.state]?.map((district) => (
      <option key={district} value={district}>
        {district}
      </option>
    ))}
</select>
            </div>

          </div>

          <div className="form-group full-width">
            <label>Describe the Grievance *</label>

<textarea
  rows="7"
  placeholder="Describe what happened. You may write in your preferred language..."
  value={grievance.description}
  onChange={(e) =>
    setGrievance({ ...grievance, description: e.target.value })
  }
></textarea>

            <small>
              The system can analyse complaints submitted in multiple
              languages.
            </small>
          </div>

          <div className="consent-box">
<input
  type="checkbox"
  checked={grievance.consent}
  onChange={(e) =>
    setGrievance({ ...grievance, consent: e.target.checked })
  }
/>
            <span>
              I confirm that the information provided above is correct to
              the best of my knowledge.
            </span>
          </div>

<button
  type="button"
  className="submit-grievance"
  onClick={() => {
    if (
      !grievance.name ||
      !grievance.mobile ||
      !grievance.state ||
      !grievance.district ||
      !grievance.description
    ) {
      alert('Please fill all required fields.')
      return
    }

    if (!grievance.consent) {
      alert('Please confirm the information before submitting.')
      return
    }

    setPage('analysis')
  }}
>
  Review Grievance →
</button>

        </form>

      </div>

    </div>
  )
}
  return (
    <div>
      <header className="top-header">
        <div className="gov-title">
          <h2>National Helpline Against Atrocities</h2>
          <p>Ministry of Social Justice & Empowerment</p>
          <p>Government of India</p>
        </div>

        <div className="helpline">
          <span>24×7 Toll Free Helpline</span>
          <strong>14566</strong>
        </div>
      </header>

      <nav className="navbar">
        <span className="logo">NHAA</span>

        <button
  className="officer-login-btn"
  onClick={() => setPage('dashboard')}

>
  Officer Login
</button>

        <select>
          <option>English</option>
          <option>हिन्दी</option>
        </select>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <p className="tag">SAFE • ACCESSIBLE • RESPONSIVE</p>

          <h1>
            Your Voice Matters.
            <br />
            <span>We Are Here To Help.</span>
          </h1>

          <p className="description">
            A unified platform to report grievances, receive timely assistance
            and track action under the Scheduled Castes and Scheduled Tribes
            (Prevention of Atrocities) Act.
          </p>

          <div className="buttons">
            <button
  className="primary-btn"
  onClick={() => setPage('login')}
>
  Register Grievance
</button>

            <button
  className="secondary-btn"
  onClick={() => setPage('trackLookup')}
>
  Track Grievance
</button>
          </div>

          <p className="emergency">
            For immediate assistance, call <strong>14566</strong>
          </p>
        </div>

        <div className="info-card">
          <div className="shield">✓</div>

          <h2>Confidential & Secure</h2>

          <p>
            Your information is handled securely and shared only with
            authorised officials responsible for resolving your grievance.
          </p>

          <div className="info-row">
            <span>✓ Secure grievance submission</span>
            <span>✓ Status tracking</span>
            <span>✓ Timely escalation</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App