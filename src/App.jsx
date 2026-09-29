import { useState } from 'react'
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

function App() {
  const [page, setPage] = useState('home')
  const [grievance, setGrievance] = useState({
  name: '',
  mobile: '',
  state: '',
  district: '',
  description: '',
  consent: false
})
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
          onClick={() => setPage('home')}
        >
          ← Back to Home
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
  Submit for Analysis →
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

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">How It Works</a>
          <a href="#">Contact</a>
        </div>

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
  onClick={() => setPage('register')}
>
  Register Grievance
</button>

            <button className="secondary-btn">
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