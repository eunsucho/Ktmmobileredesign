import { useState, useEffect, useRef } from 'react';
import { Check, Calendar, X, Clock, ChevronDown, ChevronUp, Search, MapPin, Settings, Info, Phone, PhoneOff, Pointer, FileText, Mail, MessageSquare, Mails } from 'lucide-react';
import '../styles/fonts.css';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFading, setIsFading] = useState(false);

  // Step 1 States
  const [selectedType, setSelectedType] = useState('내국인');
  
  // Name & ID with Floating Label & Autocomplete
  const [name, setName] = useState('');
  const [nameFocus, setNameFocus] = useState(false);
  const [showNameAutocomplete, setShowNameAutocomplete] = useState(false);
  
  const [idNumber, setIdNumber] = useState('');
  const [idFocus, setIdFocus] = useState(false);

  const [allAgreed, setAllAgreed] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);
  const [infoConfirmed, setInfoConfirmed] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
  
  // Verification States
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1793); // 29:53 in seconds

  // Step 2 States
  const [simHasType, setSimHasType] = useState<'보유' | '미보유'>('보유');
  const [simBuyPlace, setSimBuyPlace] = useState<'다이렉트몰' | '편의점/마트' | '오픈마켓' | ''>('다이렉트몰');
  const [simNumber, setSimNumber] = useState('');
  const [simFocus, setSimFocus] = useState(false);
  const [phone, setPhone] = useState('');
  const [optPhone, setOptPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [zipcodeFocus, setZipcodeFocus] = useState(false);
  const [address, setAddress] = useState('');
  const [addressFocus, setAddressFocus] = useState(false);
  const [detailAddress, setDetailAddress] = useState('');
  const [detailAddressFocus, setDetailAddressFocus] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressSearchTerm, setAddressSearchTerm] = useState('');
  const [addressSearchFocus, setAddressSearchFocus] = useState(false);
  const [addressSearchStep, setAddressSearchStep] = useState<'init' | 'result' | 'detail'>('init');
  const [modalDetailAddress, setModalDetailAddress] = useState('');
  const [modalDetailFocus, setModalDetailFocus] = useState(false);
  const [showAddressAlert, setShowAddressAlert] = useState(false);

  const handleOpenAddressModal = (target: 'home' | 'shipping' = 'home') => {
    setAddressTarget(target);
    setAddressSearchTerm('');
    setAddressSearchStep('init');
    setModalDetailAddress('');
    setModalDetailFocus(false);
    setShowAddressModal(true);
  };
  const [addressTarget, setAddressTarget] = useState<'home' | 'shipping'>('home');
  const [shippingAddress, setShippingAddress] = useState({ zonecode: '', address: '', detailAddress: '' });
  const [isShippingAddressModified, setIsShippingAddressModified] = useState(false);
  const [selectedIdType, setSelectedIdType] = useState('주민등록증');
  const [idIssueDate, setIdIssueDate] = useState('');
  const [idAgree, setIdAgree] = useState(false);
  const [bohunNumber, setBohunNumber] = useState('');
  const [faceAuthLoading, setFaceAuthLoading] = useState(false);
  const [showFaceUrlModal, setShowFaceUrlModal] = useState(false);
  const [faceUrlSent, setFaceUrlSent] = useState(true);
  const [showFaceResultModal, setShowFaceResultModal] = useState(false);
  const [faceResultChecked, setFaceResultChecked] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calYear, setCalYear] = useState(2026);
  const [calMonth, setCalMonth] = useState(4);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);

  // Step 3 States
  const [telecom, setTelecom] = useState('');
  const [movingPhone, setMovingPhone] = useState('');
  const [showConsentMethodModal, setShowConsentMethodModal] = useState(false);
  const [consentMethodTab, setConsentMethodTab] = useState<'sms' | 'ars'>('sms');
  const [showConsentRequestModal, setShowConsentRequestModal] = useState(false);
  const [isConsentRequested, setIsConsentRequested] = useState(false);

  // Step 4 States
  const [recommendId, setRecommendId] = useState('');
  const [showRecommendDropdown, setShowRecommendDropdown] = useState(false);
  const [soloCombine, setSoloCombine] = useState<'나중에 신청' | '결합 신청'>('나중에 신청');
  const [isSoloCombineAgreed, setIsSoloCombineAgreed] = useState(false);
  const [showSoloModal, setShowSoloModal] = useState(false);
  const [showSoloTooltip, setShowSoloTooltip] = useState(false);
  const [isCatchcallExpanded, setIsCatchcallExpanded] = useState(false);
  const [isWaitcallExpanded, setIsWaitcallExpanded] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showAddonModal, setShowAddonModal] = useState(false);
  const [addonSum, setAddonSum] = useState(0);
  const [insurance, setInsurance] = useState('미가입');
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);

  // Step 5 States
  const [billType, setBillType] = useState<'이메일 명세서' | '모바일 명세서(MMS)' | '우편 명세서'>('이메일 명세서');
  const [payMethod, setPayMethod] = useState<'자동이체' | '신용카드'>('자동이체');
  const [bankName, setBankName] = useState('');
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  
  // Card Payment States
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpMonth, setCardExpMonth] = useState('');
  const [cardExpYear, setCardExpYear] = useState('');
  const [showExpMonthDropdown, setShowExpMonthDropdown] = useState(false);
  const [showExpYearDropdown, setShowExpYearDropdown] = useState(false);

  // Step 5 Validation & Completion
  const [isPaymentValidated, setIsPaymentValidated] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderModalAgreed, setOrderModalAgreed] = useState(false);
  const [isCompletingOrder, setIsCompletingOrder] = useState(false);

  // SIM Validation States
  const [isSimValidating, setIsSimValidating] = useState(false);
  const [simValidated, setSimValidated] = useState(false);
  const [showSimResultModal, setShowSimResultModal] = useState(false);
  const [simError, setSimError] = useState(false);

  const generateDates = () => {
    const dates = [];
    const daysInMonth = new Date(calYear, calMonth, 0).getDate();
    const firstDay = new Date(calYear, calMonth - 1, 1).getDay();
    const prevMonthDays = new Date(calYear, calMonth - 1, 0).getDate();
    
    for(let i = firstDay - 1; i >= 0; i--) {
      dates.push({ day: prevMonthDays - i, isCurrent: false, fullDate: '' });
    }
    for(let i = 1; i <= daysInMonth; i++) {
      dates.push({ 
        day: i, 
        isCurrent: true, 
        fullDate: `${calYear}-${String(calMonth).padStart(2, '0')}-${String(i).padStart(2, '0')}` 
      });
    }
    const remaining = 42 - dates.length;
    for(let i = 1; i <= remaining; i++) {
      dates.push({ day: i, isCurrent: false, fullDate: '' });
    }
    return dates;
  };

  // Validations
  const isStep1Valid = name.trim() !== '' && idNumber.length >= 13 && isVerified && allAgreed && infoConfirmed;
  const isStep2Valid = phone.trim() !== '' && email.trim() !== '' && zipcode.trim() !== '' && address.trim() !== '' && selectedIdType !== '' && idIssueDate !== '' && idAgree && ((selectedIdType === '주민등록증' || selectedIdType === '운전면허증') ? faceResultChecked : true) && (simHasType === '보유' ? (simNumber.length === 19 && simValidated) : simBuyPlace !== '');
  const isStep3Valid = telecom !== '' && movingPhone.trim() !== '';

  const goToStep = (step: number) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setIsFading(false);
    }, 250);
  };

  const handleFaceAuth = () => {
    setFaceAuthLoading(true);
    setTimeout(() => {
      setFaceAuthLoading(false);
    }, 2000);
  };

  const handleFaceAuthUrl = () => {
    setShowFaceUrlModal(true);
  };

  const handleSimValidation = () => {
    if (simNumber.length !== 19) {
      setSimError(true);
      setSimFocus(true); // Keep focus to show error
      return;
    }
    
    setIsSimValidating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSimValidating(false);
      setShowSimResultModal(true);
    }, 1500);
  };

  // Load shared navbar
  useEffect(() => {
    if (document.getElementById('kmnav-header')) return;
    (window as any).KMNAV_ACTIVE = '가입하기';
    const script = document.createElement('script');
    script.src = './shared-nav.js';
    document.head.appendChild(script);
  }, []);

  // Timer Effect
  useEffect(() => {
    if (showProcessModal && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [showProcessModal, timeLeft]);

  // Simulate auto verification completion
  useEffect(() => {
    if (showProcessModal) {
      const timer = setTimeout(() => {
        setShowProcessModal(false);
        setShowSuccessModal(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showProcessModal]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `0:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const displayId = idFocus 
    ? idNumber 
    : (idNumber.length >= 13 ? `${idNumber.slice(0,6)} - ●●●●●●●` : idNumber);

  const verificationMethods = ['신용카드', '네이버 인증서', 'PASS 인증서', 'toss 인증서', '범용인증서'];
  const idTypes = ['주민등록증', '운전면허증', '장애인 등록증', '국가 유공자증', '외국인 등록증'];

  return (
    <div className="min-h-screen bg-white pb-[90px] font-sans relative">
      <div id="nav-mount"></div>

      {/* Main Content Area (800px width) */}
      <main className="max-w-[800px] mx-auto px-6 py-12">
        {/* Page Title & Progress */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-[28px] font-bold text-black">
            {currentStep === 6 ? '셀프개통' : '셀프개통'}
          </h1>

          {/* 5-Step Indicator */}
          {currentStep < 6 && (
            <div className="flex items-center gap-3">
              {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-black text-white font-bold' : 'bg-gray-300 text-gray-500'}`}>
                <span className="text-sm">1</span>
              </div>
              {currentStep === 1 && <span className="text-black text-sm font-medium">본인확인·약관동의</span>}
            </div>
            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-black text-white font-bold' : 'bg-gray-300 text-gray-500'}`}>
                <span className="text-sm">2</span>
              </div>
              {currentStep === 2 && <span className="text-black text-sm font-medium">신분증 확인·유심정보</span>}
            </div>
            {/* Step 3 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${currentStep === 3 ? 'bg-black text-white font-bold' : 'bg-gray-300 text-gray-500'}`}>
                <span className="text-sm">3</span>
              </div>
              {currentStep === 3 && <span className="text-black text-sm font-medium">가입신청 정보</span>}
            </div>
            {/* Step 4 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${currentStep === 4 ? 'bg-black text-white font-bold' : 'bg-gray-300 text-gray-500'}`}>
                <span className="text-sm">4</span>
              </div>
              {currentStep === 4 && <span className="text-black text-sm font-medium">부가서비스 정보</span>}
            </div>
            {/* 부가서비스�� 정보</span>}
            </div>
            {/* Step 5 */}
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center ${currentStep === 5 ? 'bg-black text-white font-bold' : 'bg-gray-300 text-gray-500'}`}>
                <span className="text-sm">5</span>
              </div>
              {currentStep === 5 && <span className="text-black text-sm font-medium">납부정보·가입정보 확인</span>}
            </div>
            {/*
              <span className="text-black text-sm font-medium">���부정보·가입정보 확인</span>}
            */}
          </div>
          )}
        </div>

        {/* Fading Content Transition Wrapper */}
        <div className={`transition-opacity duration-250 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          
          {/* ================= STEP 1 ================= */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <h2 className="text-[20px] font-bold text-black">본인확인·약관동의</h2>
              </div>

              {/* 가입자 유형 선택 Cards */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                <button
                  onClick={() => setSelectedType('내국인')}
                  className={`h-[70px] rounded-lg border-2 flex items-center px-4 gap-3 transition ${
                    selectedType === '내국인' ? 'bg-white border-[#00BFA5]' : 'bg-white border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-[#00BFA5] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">19+</span>
                  </div>
                  <span className="text-black font-medium">내국인</span>
                  {selectedType === '내국인' && (
                    <svg className="w-6 h-6 text-[#00BFA5] ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  )}
                </button>

                <button disabled className="h-[70px] rounded-lg border-2 border-gray-300 bg-gray-100 flex items-center px-4 gap-3 cursor-not-allowed opacity-60">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">19</span>
                  </div>
                  <span className="text-gray-500 font-medium">미성년자(19세 미만)</span>
                </button>

                <button disabled className="h-[70px] rounded-lg border-2 border-gray-300 bg-gray-100 flex items-center px-4 gap-3 cursor-not-allowed opacity-60">
                  <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <span className="text-gray-500 font-medium text-sm">외국인 (Foreigner)</span>
                </button>
              </div>

              {/* 가입자 정보 Input */}
              <h3 className="text-[16px] font-bold text-black mb-4">가입자 정보</h3>
              <div className="grid grid-cols-2 gap-4 mb-10 relative">
                {/* 이름 Floating Label Input */}
                <div className="relative">
                  <div className={`w-full h-[50px] border rounded-lg bg-white relative transition-colors ${nameFocus ? 'border-blue-500 border-dashed' : 'border-gray-300'} ${(name && !nameFocus) ? 'border-gray-300' : ''}`}>
                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${nameFocus || name ? 'top-1.5 text-[11px] text-gray-500' : 'top-3.5 text-[15px] text-gray-400'}`}>
                      이름
                    </label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={e => {
                        setName(e.target.value);
                        setShowNameAutocomplete(true);
                      }} 
                      onFocus={() => {
                        setNameFocus(true);
                        setShowNameAutocomplete(true);
                      }}
                      onBlur={() => {
                        setNameFocus(false);
                        setTimeout(() => setShowNameAutocomplete(false), 200);
                      }}
                      placeholder={nameFocus && !name ? "이름 입력" : ""}
                      className={`w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none ${!nameFocus && name ? 'font-bold text-black' : 'text-black'} placeholder-gray-300 text-[15px]`}
                    />
                  </div>
                  {/* Name Autocomplete Dropdown */}
                  {showNameAutocomplete && (
                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                      <div 
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
                        onMouseDown={() => {
                          setName("성해주");
                          setShowNameAutocomplete(false);
                        }}
                      >
                        <span className="font-medium text-black">성해주</span>
                        <span className="text-[12px] text-gray-400">추천</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 주민등록번호 Floating Label Input */}
                <div className="relative">
                  <div className={`w-full h-[50px] border rounded-lg bg-white relative transition-colors ${idFocus ? 'border-blue-500 border-dashed' : 'border-gray-300'}`}>
                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${idFocus || idNumber ? 'top-1.5 text-[11px] text-gray-500' : 'top-3.5 text-[15px] text-gray-400'}`}>
                      주민등록번호
                    </label>
                    <input 
                      type="text" 
                      value={displayId}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, '');
                        if(val.length <= 13) setIdNumber(val);
                      }} 
                      onFocus={() => setIdFocus(true)}
                      onBlur={() => setIdFocus(false)}
                      placeholder={idFocus && !idNumber ? "숫자만 입력" : ""}
                      className={`w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none ${!idFocus && idNumber.length >= 13 ? 'font-bold text-black tracking-wider' : 'text-black'} placeholder-gray-300 text-[15px]`}
                    />
                  </div>
                </div>
              </div>

              {/* 본인인증 방법 선택 Buttons */}
              <h3 className="text-[16px] font-bold text-black mb-4">본인인증 방법 선택</h3>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {verificationMethods.map((method) => {
                  const isSelected = selectedMethod === method;
                  return (
                    <button
                      key={method}
                      onClick={() => {
                        setSelectedMethod(method);
                        setIsVerified(false); // Reset verification on change
                      }}
                      className={`h-[80px] rounded-[16px] border bg-white flex items-center justify-center relative transition-colors ${
                        isSelected ? 'border-blue-500 border-dashed text-black font-bold' : 'border-gray-200 text-black hover:border-gray-300'
                      }`}
                    >
                      <span className="text-[15px] px-1 break-keep text-center">{method}</span>
                      {isSelected && <Check className="w-5 h-5 text-black absolute top-3 right-3" />}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Verification Area */}
              {selectedMethod && (
                <div className="bg-[#F5F5F5] rounded-xl p-5 mb-10 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="mb-4">
                    {selectedMethod === '신용카드' && (
                      <div className="space-y-1">
                        <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>고객님의 본인명의(미성년자의 경우 법정 대리인)의 국내발행 신용카드 정보를 입력해주세요.(체크카드 인증불가)</span></p>
                        <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>신용카드 비밀번호 3회 이상 오류 시 해당카드로 인증을 받을 수 없으니 유의하시기 바랍니다.</span></p>
                      </div>
                    )}
                    {selectedMethod === '네이버 인증서' && (
                      <div className="space-y-1">
                        <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>네이버 앱에 인증을 진행하는 사용자의 ID가 로그인되어 있어야 인증 진행이 가능합니다.</span></p>
                        <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>네이버인증서는 발급 과정에서 본인명의의 휴대폰인증이 필요하며, 아이폰5S/갤럭시S5, Note4 이상에서 지원됩니다.(iOS10, 안드로이드6 이상)</span></p>
                        <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>네이버 인증이 정상적으로 진행되지 않으실 경우 네이버인증서를 재발급 받으신 후 이용이 가능합니다.</span></p>
                      </div>
                    )}
                    {selectedMethod === '범용인증서' && (
                      <div className="space-y-2">
                        <div className="space-y-1 mb-3">
                          <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>은행 및 한국전자인증, 한국정보인증에서 발급된 범용 공인증서(유료)만 사용 가능합니다.</span></p>
                          <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>체크카드는 인증이 불가합니다.</span></p>
                        </div>
                        <p className="text-[13px] font-bold text-black mb-2">※ 범용인증서 발급받기</p>
                        <div className="flex gap-2 pb-2 overflow-x-auto">
                          {['KB국민은행', 'KEB하나은행', '우리은행', '신한은행', 'IBK기업은행', 'Citibank', 'Standard Chartered'].map(bank => (
                            <button key={bank} className="bg-white border border-gray-300 px-3 py-2 text-[12px] text-gray-700 rounded whitespace-nowrap hover:border-gray-500 shadow-sm flex-shrink-0">
                              {bank}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {(selectedMethod === 'PASS 인증서' || selectedMethod === 'toss 인증서') && (
                      <div className="space-y-1">
                        <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>해당 앱에 가입 및 인증서가 발급되어 있어야 인증이 가능합니다.</span></p>
                        <p className="flex gap-1 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px]">•</span><span>원활한 인증을 위해 앱을 최신 버전으로 업데이트 해주시길 바랍니다.</span></p>
                      </div>
                    )}
                  </div>
                  
                  <button 
                    onClick={() => {
                      setShowProcessModal(true);
                      setTimeLeft(1793);
                    }}
                    className="w-full h-[55px] bg-[#00BFA5] hover:bg-[#00A08A] text-white font-bold rounded-lg text-[16px] transition-colors flex items-center justify-center gap-2"
                  >
                    {isVerified ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>{selectedMethod} 완료</span>
                      </>
                    ) : (
                      selectedMethod === '신용카드' ? '신용카드 인증' :
                      selectedMethod === '네이버 인증서' ? '네이버 인증 완료' :
                      selectedMethod === '범용인증서' ? '범용인증' :
                      `${selectedMethod.split(' ')[0]} 인증하기`
                    )}
                  </button>
                </div>
              )}

              {/* 약관동의 Accordion */}
              <h3 className="text-[16px] font-bold text-black mb-4">약관동의</h3>
              <div className="border border-gray-300 rounded-lg bg-white mb-10">
                <div className="h-[80px] px-5 flex items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center" onClick={() => setAllAgreed(!allAgreed)}>
                      {allAgreed && <div className="w-3 h-3 bg-gray-600 rounded-full"></div>}
                    </div>
                    <div className="flex-1">
                      <p className="text-[14px] text-black leading-relaxed mb-1">
                        이용약관, 개인정보 수집/이용 및 선택동의의 항목에 모두 동의합니다.
                      </p>
                      <p className="text-[12px] text-[#E60012]">
                        ※ 고객님의 편의를 위한 모든 약관(선택약관 포함)에 일괄동의 하시겠습니까?
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setTermsExpanded(!termsExpanded)} className="text-gray-400 text-xl">
                    {termsExpanded ? '∧' : '∨'}
                  </button>
                </div>
              </div>

              {/* 셀프개통 안내사항 */}
              <h3 className="text-[16px] font-bold text-black mb-4">셀프개통 안내사항</h3>
              <div className="border border-gray-300 rounded-lg bg-white px-5 py-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-gray-400 rounded-full cursor-pointer flex items-center justify-center" onClick={() => setInfoConfirmed(!infoConfirmed)}>
                    {infoConfirmed && <div className="w-3 h-3 bg-gray-600 rounded-full"></div>}
                  </div>
                  <div>
                    <span className="text-[14px] text-black">본인은 안내사항을 확인하였습니다.</span>
                    <span className="text-[13px] text-gray-500 ml-2">(필수)</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F5F5F5] rounded-lg px-6 py-5 mb-12">
                <div className="space-y-4 text-[13px] text-gray-700 leading-relaxed">
                  <div className="flex gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <p>
                      최근 대출업자, SNS 등을 통해 이동전화 개통 시 자금을 제공해 주겠다고 권유한 후, 개통된 휴대폰/유심을 대출 사기, 보이스 피싱 조직에 유통하는 등의 악용하는 사례가 다수 적발되고 ���습니다. 이러한 제 3자에게 본인명의 휴대폰/유심을 개통해주거나, 개통에 필요한 신청서류를 제공하는 행위는 전기통신사업법 제30조(타인사용의 제한) 및 97조(벌칙)의 규정에 따라 1년 이하의 징역 및 5천만원 이하의 형사처벌을 받을 수 있으니 각별히 주의하시기 바랍니다.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-500 mt-1">•</span>
                    <p>
                      부정개통으로 인한 금전 피해 방지를 위해 개통일 포함 3일 후 24시까지 소액결제 이용이 제한 됩니다.<br />
                      예) 월요일 개통 시 수요일 23:59분까지 소액결제 이용 제한
                    </p>
                  </div>
                </div>
              </div>

              {/* 다음 버튼 */}
              <div className="flex justify-center mb-16">
                <button
                  disabled={!isStep1Valid}
                  onClick={() => goToStep(2)}
                  className={`w-[400px] h-[60px] rounded-lg text-[16px] font-bold transition-colors ${
                    isStep1Valid ? 'bg-[#E60012] text-white cursor-pointer hover:bg-red-700' : 'bg-[#E5E5E5] text-gray-500 cursor-not-allowed'
                  }`}
                >
                  다음
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2 ================= */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-10">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <h2 className="text-[20px] font-bold text-black">신분증 확인·유심정보</h2>
              </div>

              <div className="flex flex-col gap-14 mb-16">
                {/* 2. 연락처 */}
                <div className="flex items-start">
                  <div className="w-[200px] flex-shrink-0 pt-3">
                    <h3 className="text-[16px] font-bold text-black">연락처</h3>
                  </div>
                  <div className="w-[540px] flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="휴대폰" value={phone} onChange={e=>setPhone(e.target.value)} className="w-full h-[50px] px-4 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-black" />
                      <input type="text" placeholder="전화번호(선택)" value={optPhone} onChange={e=>setOptPhone(e.target.value)} className="w-full h-[50px] px-4 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-black" />
                    </div>
                    <div className="w-1/2 pr-1.5">
                      <input type="email" placeholder="이메일" value={email} onChange={e=>setEmail(e.target.value)} className="w-full h-[50px] px-4 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-black" />
                    </div>
                  </div>
                </div>

                {/* 3. 주소 */}
                <div className="flex items-start">
                  <div className="w-[200px] flex-shrink-0 pt-3">
                    <h3 className="text-[16px] font-bold text-black">주소</h3>
                  </div>
                  <div className="w-[540px] flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <div className={`w-full h-[50px] border border-gray-300 rounded-lg bg-white relative transition-colors`}>
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${zipcode ? 'top-1.5 text-[11px] text-gray-500' : 'top-3.5 text-[15px] text-gray-400'}`}>
                            우편번호
                          </label>
                          <input type="text" readOnly onClick={() => handleOpenAddressModal('home')} value={zipcode} onChange={e=>setZipcode(e.target.value)} className={`w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none text-black text-[15px] cursor-pointer`} />
                          <button onClick={() => handleOpenAddressModal('home')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00BFA5] font-bold text-[14px] z-10">우편번호찾기</button>
                        </div>
                      </div>
                      <div className="relative">
                        <div className={`w-full h-[50px] border border-gray-300 rounded-lg bg-white relative transition-colors`}>
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${address ? 'top-1.5 text-[11px] text-gray-500' : 'top-3.5 text-[15px] text-gray-400'}`}>
                            주소
                          </label>
                          <input type="text" readOnly onClick={() => handleOpenAddressModal('home')} value={address} onChange={e=>setAddress(e.target.value)} className={`w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none text-black text-[15px] cursor-pointer`} />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className={`w-full h-[50px] border border-gray-300 focus-within:border-black rounded-lg bg-white relative transition-colors`}>
                        <input 
                          type="text" 
                          value={detailAddress} 
                          onChange={e=>setDetailAddress(e.target.value)} 
                          className={`peer w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none text-black text-[15px]`} 
                        />
                        <label className={`absolute left-4 transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-gray-500 ${detailAddress ? 'top-1.5 text-[11px] text-gray-500' : 'top-3.5 text-[15px] text-gray-400'}`}>
                          상세주소
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. 신분증 확인 */}
                <div className="flex items-start">
                  <div className="w-[200px] flex-shrink-0 pt-3">
                    <h3 className="text-[16px] font-bold text-black">신분증 확인</h3>
                  </div>
                  <div className="w-[540px]">
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {idTypes.map(type => {
                        const isDisabled = type === '외국인 등록증';
                        const isSelected = selectedIdType === type;
                        return (
                          <button 
                            key={type}
                            disabled={isDisabled}
                            onClick={() => setSelectedIdType(type)}
                            className={`h-[55px] rounded-lg border flex items-center justify-center px-4 relative transition-colors ${
                              isDisabled ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' :
                              isSelected ? 'bg-white border-blue-500 border-dashed text-black font-medium' :
                              'bg-white border-gray-300 text-black hover:border-gray-400'
                            }`}
                          >
                            <span className="text-[14px]">{type}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-black absolute right-3" />
                            )}
                          </button>
                        );
                      })}
                      <div className="h-[55px]"></div>
                    </div>

                    {/* Dynamic ID Areas */}
                    {selectedIdType && (
                      <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        {(selectedIdType === '주민등록증' || selectedIdType === '운전면허증') && (
                          <div className="flex flex-col gap-3 relative">
                            <button onClick={handleFaceAuthUrl} className="w-full h-[55px] bg-[#00BFA5] hover:bg-[#00A08A] text-white font-bold rounded-lg text-[16px] transition-colors">
                              안면인증 URL 받기
                            </button>
                            <div className="grid grid-cols-2 gap-3">
                              <button 
                                onClick={() => setShowFaceResultModal(true)}
                                disabled={!faceUrlSent || faceResultChecked} 
                                className={`h-[55px] font-bold rounded-lg text-[15px] transition-colors ${
                                  faceResultChecked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                                  faceUrlSent ? 'bg-[#00BFA5] text-white hover:bg-[#00A08A] cursor-pointer' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                              >
                                안면인증 결과 확인
                              </button>
                              <button disabled className="h-[55px] bg-gray-100 text-gray-400 font-bold rounded-lg text-[15px] cursor-not-allowed">
                                안면인증 완료
                              </button>
                            </div>

                            {/* Revealed after result checked */}
                            {faceResultChecked && (
                              <div className="flex flex-col gap-4 mt-4 animate-in fade-in slide-in-from-top-2">
                                <div className="bg-gray-100 rounded-xl p-6 w-full flex justify-center">
                                  <div className="bg-white rounded-lg p-5 w-[300px] shadow-sm relative border border-gray-200">
                                    <div className="font-extrabold text-[16px] mb-4 text-black tracking-tight">주민등록증</div>
                                    <div className="flex gap-4">
                                      <div className="flex-1">
                                        <div className="text-black font-bold text-[14px] mb-1">홍길동</div>
                                        <div className="text-gray-500 text-[12px] mb-3">920101-1234567</div>
                                        <div className="border border-red-500 text-red-500 text-[11px] px-2 py-1 mt-3 inline-block font-bold">발급일자 2020.12.31</div>
                                        <div className="text-[12px] mt-4 font-bold tracking-widest text-black">서울특별시 강남구청장</div>
                                      </div>
                                      <div className="w-[70px] h-[90px] bg-gray-200 rounded flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                                        <div className="absolute bottom-0 w-12 h-14 bg-gray-300 rounded-t-[20px]"></div>
                                        <div className="absolute top-3 w-8 h-8 bg-gray-300 rounded-full"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="relative">
                                  <div className={`w-full h-[50px] border rounded-lg bg-white relative transition-colors ${showDatePicker ? 'border-blue-500 border-dashed' : 'border-gray-300'}`}>
                                    <label className={`absolute left-4 transition-all duration-200 pointer-events-none ${showDatePicker || idIssueDate ? 'top-1.5 text-[11px] text-gray-500' : 'top-3.5 text-[15px] text-gray-400'}`}>
                                      발급 일자
                                    </label>
                                    <input 
                                      type="text" 
                                      value={idIssueDate} 
                                      readOnly
                                      onClick={() => setShowDatePicker(!showDatePicker)}
                                      className="w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none text-black cursor-pointer"
                                    />
                                    <Calendar className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                  </div>
                                  
                                  {/* Datepicker Dropdown */}
                                  {showDatePicker && (
                                    <div className="absolute top-[55px] left-0 w-[300px] bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 z-50 p-4 animate-in fade-in">
                                      <div className="flex justify-between items-center mb-5 px-2 relative">
                                          <div className="font-bold text-[15px] flex items-center gap-1 cursor-pointer text-black select-none">
                                            <span onClick={() => setCalYear(prev => prev - 1)} className="hover:text-blue-500 px-1">&lt;</span>
                                            {calYear}년
                                            <span onClick={() => setCalYear(prev => prev + 1)} className="hover:text-blue-500 px-1">&gt;</span>
                                          </div>
                                          <div 
                                            className="font-bold text-[15px] flex items-center gap-1 cursor-pointer text-black select-none relative"
                                            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                                          >
                                            {calMonth}월 <span className="text-[10px]">▼</span>
                                            
                                            {/* Month Dropdown */}
                                            {showMonthDropdown && (
                                              <div className="absolute top-6 right-0 w-24 bg-white border border-gray-200 rounded shadow-lg py-1 z-[60]">
                                                {[...Array(12)].map((_, i) => (
                                                  <div 
                                                    key={i} 
                                                    className={`px-3 py-2 text-[13px] flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-colors ${calMonth === i + 1 ? 'font-bold' : 'font-normal'}`}
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      setCalMonth(i + 1);
                                                      setShowMonthDropdown(false);
                                                    }}
                                                  >
                                                    {calMonth === i + 1 && <Check className="w-3 h-3" />}
                                                    <span className={calMonth === i + 1 ? '' : 'ml-5'}>{i + 1}월</span>
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                      </div>
                                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                          <div className="text-[#E60012] text-[12px] font-bold">일</div>
                                          <div className="text-black text-[12px] font-bold">월</div>
                                          <div className="text-black text-[12px] font-bold">화</div>
                                          <div className="text-black text-[12px] font-bold">수</div>
                                          <div className="text-black text-[12px] font-bold">목</div>
                                          <div className="text-black text-[12px] font-bold">금</div>
                                          <div className="text-blue-500 text-[12px] font-bold">토</div>
                                      </div>
                                      <div className="grid grid-cols-7 gap-1 text-center relative">
                                          <div 
                                            onClick={() => {
                                              if (calMonth === 1) { setCalMonth(12); setCalYear(prev => prev - 1); }
                                              else { setCalMonth(prev => prev - 1); }
                                            }}
                                            className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
                                          >
                                            <span className="text-gray-400 font-bold">&lt;</span>
                                          </div>
                                          <div 
                                            onClick={() => {
                                              if (calMonth === 12) { setCalMonth(1); setCalYear(prev => prev + 1); }
                                              else { setCalMonth(prev => prev + 1); }
                                            }}
                                            className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-full"
                                          >
                                            <span className="text-gray-400 font-bold">&gt;</span>
                                          </div>
                                          
                                          {generateDates().map((d, i) => (
                                            <div 
                                              key={i} 
                                              className={`${d.isCurrent ? 'text-black cursor-pointer hover:bg-blue-50 hover:text-blue-600' : 'text-gray-300 pointer-events-none'} text-[13px] py-1.5 rounded transition-colors`}
                                              onClick={() => {
                                                if (d.isCurrent) {
                                                  setIdIssueDate(d.fullDate);
                                                  setShowDatePicker(false);
                                                }
                                              }}
                                            >
                                              {d.day}
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer mt-1 w-max" onClick={() => setIdAgree(!idAgree)}>
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${idAgree ? 'bg-[#00BFA5]' : 'border border-gray-400 bg-white'}`}>
                                    {idAgree && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                                  </div>
                                  <span className={`text-[14px] transition-all relative ${idAgree ? 'text-black font-bold' : 'text-black'}`}>
                                    본인 조회에 동의합니다.
                                    {idAgree && <div className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-[#00BFA5]"></div>}
                                  </span>
                                </label>
                                <p className="flex gap-1 text-[12px] text-gray-500 leading-relaxed">
                                  <span className="mt-0.5">•</span>
                                  <span>입력하신 정보는 한국정보통신진흥협회(KAIT)에서 제공하는 부정가입 방지 시스템을 통해 신분증 진위여부 판단에 이용됩니다.</span>
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {selectedIdType === '장애인 등록증' && (
                          <div className="flex flex-col gap-4">
                            <div className="bg-gray-100 rounded-xl p-6 w-full flex justify-center">
                              <div className="bg-white rounded-lg p-5 w-[300px] shadow-sm relative">
                                <div className="font-extrabold text-[18px] mb-4 text-black">복지카드</div>
                                <div className="flex gap-4">
                                  <div className="flex-1">
                                    <div className="text-gray-500 text-[13px] mb-1">홍길동</div>
                                    <div className="text-gray-500 text-[13px] mb-3">920101-1234567</div>
                                    <div className="border border-red-500 text-red-500 text-[12px] px-2 py-1 mt-3 inline-block">발급일자 2020.12.31</div>
                                    <div className="text-[12px] mt-4 font-bold tracking-widest">서울특별시 강남구청장</div>
                                  </div>
                                  <div className="w-[70px] h-[90px] bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mb-2"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="relative">
                              <input type="text" placeholder="YYYY-MM-DD" value={idIssueDate} onChange={e=>setIdIssueDate(e.target.value)} className="w-full h-[50px] px-4 pr-12 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-black" />
                              <Calendar className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer mt-1 w-max">
                              <div className={`w-5 h-5 border rounded-full flex items-center justify-center ${idAgree ? 'border-[#00BFA5] bg-[#00BFA5]' : 'border-gray-400 bg-white'}`}>
                                {idAgree && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                              </div>
                              <span className="text-[14px] text-black">본인 조회에 동의합니다.</span>
                            </label>
                            <p className="flex gap-1 text-[12px] text-gray-500 leading-relaxed">
                              <span className="mt-0.5">•</span>
                              <span>입력하신 정보는 한국정보통신진흥협회(KAIT)에서 제공하는 부정가입 방지 시스템을 통해 신분증 진위여부 판단에 이용됩니다.</span>
                            </p>
                          </div>
                        )}

                        {selectedIdType === '국가 유공자증' && (
                          <div className="flex flex-col gap-4">
                            <div className="bg-gray-100 rounded-xl p-6 w-full flex justify-center">
                              <div className="bg-white rounded-lg p-5 w-[320px] shadow-sm relative">
                                <div className="flex justify-between items-start mb-4">
                                  <div className="font-extrabold text-[16px] text-black">국가보훈등록증</div>
                                  <div className="text-[12px] font-bold text-gray-800 border border-gray-300 px-1">국가유공자</div>
                                </div>
                                <div className="flex gap-4">
                                  <div className="w-[70px] h-[90px] bg-gray-200 rounded flex flex-col items-center justify-center flex-shrink-0">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full mb-2"></div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-[15px] font-bold mb-1 text-black">홍길동</div>
                                    <div className="text-gray-500 text-[12px] mb-1">920101-1234567</div>
                                    <div className="text-gray-500 text-[12px] mb-3">전상군경 6급 1항</div>
                                    
                                    <div className="flex items-center gap-2 mb-1.5">
                                      <span className="text-red-500 text-[11px] font-bold w-12 shrink-0">보훈번호</span>
                                      <div className="border border-red-500 text-black text-[12px] px-1 py-0.5 w-full text-center">00-123456</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-red-500 text-[11px] font-bold w-12 shrink-0">발급일자</span>
                                      <div className="border border-red-500 text-black text-[12px] px-1 py-0.5 w-full text-center">2020. 12. 31</div>
                                    </div>
                                    <div className="text-[12px] mt-4 font-bold text-right tracking-widest text-black">국가보훈부장관</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <input type="text" placeholder="보훈번호" value={bohunNumber} onChange={e=>setBohunNumber(e.target.value)} className="w-full h-[50px] px-4 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-black" />
                            <div className="relative">
                              <input type="text" placeholder="YYYY-MM-DD" value={idIssueDate} onChange={e=>setIdIssueDate(e.target.value)} className="w-full h-[50px] px-4 pr-12 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-black" />
                              <Calendar className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <label className="flex items-center gap-2 cursor-pointer mt-1 w-max">
                              <div className={`w-5 h-5 border rounded-full flex items-center justify-center ${idAgree ? 'border-[#00BFA5] bg-[#00BFA5]' : 'border-gray-400 bg-white'}`}>
                                {idAgree && <div className="w-2.5 h-2.5 bg-white rounded-full"></div>}
                              </div>
                              <span className="text-[14px] text-black">본인 조회에 동의합니다.</span>
                            </label>
                            <p className="flex gap-1 text-[12px] text-gray-500 leading-relaxed">
                              <span className="mt-0.5">•</span>
                              <span>입력하신 정보는 한국정보통신진흥협회(KAIT)에서 제공하는 부정가입 방지 시스템을 통해 신분증 진위여부 판단에 이용됩니다.</span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {idAgree && (
                  <div className="animate-in slide-in-from-top-4 fade-in duration-300">
                    {/* 1. 유심정보 */}
                    <div className="flex items-start">
                      <div className="w-[200px] flex-shrink-0 pt-3">
                        <h3 className="text-[16px] font-bold text-black">유심정보</h3>
                      </div>
                      <div className="w-[540px]">
                        {/* 유형 선택 카드 */}
                        <div className="flex gap-3 mb-6">
                          <button
                            onClick={() => setSimHasType('보유')}
                            className={`flex-1 h-[60px] rounded-[8px] border flex items-center justify-center relative transition-colors ${
                              simHasType === '보유' 
                                ? 'border-[#00BFA5] border-dashed bg-white' 
                                : 'border-gray-200 bg-white text-gray-400'
                            }`}
                          >
                            <span className={`font-bold text-[15px] ${simHasType === '보유' ? 'text-black' : 'text-gray-400'}`}>
                              유심 보유
                            </span>
                            {simHasType === '보유' && (
                              <div className="absolute right-4 w-[20px] h-[20px] rounded-full bg-[#00BFA5] flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              </div>
                            )}
                          </button>
                          <button
                            onClick={() => setSimHasType('미보유')}
                            className={`flex-1 h-[60px] rounded-[8px] border flex items-center justify-center relative transition-colors ${
                              simHasType === '미보유' 
                                ? 'border-[#00BFA5] border-dashed bg-white' 
                                : 'border-gray-200 bg-white text-gray-400'
                            }`}
                          >
                            <span className={`font-bold text-[15px] ${simHasType === '미보유' ? 'text-black' : 'text-gray-400'}`}>
                              유심 미보유
                            </span>
                            {simHasType === '미보유' && (
                              <div className="absolute right-4 w-[20px] h-[20px] rounded-full bg-[#00BFA5] flex items-center justify-center">
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                              </div>
                            )}
                          </button>
                        </div>

                        <div className="animate-in fade-in duration-200">
                          {simHasType === '보유' ? (
                            <>
                              {/* SIM Card Sample Box */}
                              <div className="bg-gray-100 rounded-xl p-6 mb-5 flex justify-center">
                                <div className="bg-white rounded-xl p-4 w-[280px] shadow-sm relative">
                                  <div className="flex justify-between items-center mb-6">
                                    <span className="text-[12px] font-bold">유심 카드 안내</span>
                                    <span className="text-[12px] text-[#E60012] font-extrabold tracking-tighter">kt M mobile</span>
                                  </div>
                                  <div className="flex gap-5 items-center mb-5">
                                    <div className="w-9 h-12 border border-yellow-500 rounded-sm relative overflow-hidden bg-yellow-50">
                                      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-yellow-500"></div>
                                      <div className="absolute top-0 left-1/2 w-[1px] h-full bg-yellow-500"></div>
                                    </div>
                                    <div>
                                      <div className="text-[11px] text-gray-400">898230</div>
                                      <div className="text-[11px] text-gray-400">1234567</div>
                                    </div>
                                  </div>
                                  <div className="bg-yellow-200/40 px-2 py-1 inline-block rounded">
                                    <span className="font-bold text-[14px] tracking-widest text-black">1234 1234 1234 123 F</span>
                                  </div>
                                  <div className="text-[11px] mt-2 font-bold text-black">PUK: 12345678</div>
                                  <div className="absolute bottom-4 right-4 flex gap-0.5">
                                     <div className="w-0.5 h-6 bg-black"></div><div className="w-1 h-6 bg-black"></div><div className="w-0.5 h-6 bg-black"></div><div className="w-1.5 h-6 bg-black"></div><div className="w-0.5 h-6 bg-black"></div><div className="w-1 h-6 bg-black"></div><div className="w-0.5 h-6 bg-black"></div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Input Area */}
                              <div className="mb-3">
                                <input 
                                  type="text" 
                                  placeholder={simFocus ? "" : "직접입력('-'없이 입력)"}
                                  value={simNumber}
                                  disabled={simValidated}
                                  onChange={e => {
                                    const val = e.target.value.replace(/[^0-9]/g, '');
                                    if(val.length <= 19) {
                                      setSimNumber(val);
                                      setSimError(false); // Clear error on typing
                                    }
                                  }}
                                  onFocus={() => setSimFocus(true)}
                                  onBlur={() => setSimFocus(false)}
                                  className={`w-full h-[50px] px-4 bg-white border rounded-lg text-[15px] outline-none transition-colors 
                                    ${simValidated ? 'bg-gray-50 text-black border-gray-300 cursor-not-allowed' :
                                      simError ? 'border-red-500 border-dashed' :
                                      simFocus ? 'border-blue-500 border-dashed text-black' : 'border-gray-300 focus:border-gray-400'
                                    }`}
                                />
                              </div>
                              {simError && !simValidated && (
                                <p className="text-[#E60012] text-[12px] font-medium mb-3">유심번호 19자리를 입력해 주세요.</p>
                              )}
                              
                              <div className="text-[13px] text-gray-500 leading-relaxed mb-5">
                                <p className="flex gap-1"><span>•</span><span>유심 카드를 보유한 고객님께서는 유심번호 19자리를 입력해 주세요.</span></p>
                                <p className="flex gap-1"><span>•</span><span>유심 보유를 선택하실 경우 유심비용이 미청구 됩니다.</span></p>
                              </div>
                              
                              <button 
                                onClick={handleSimValidation}
                                disabled={simValidated}
                                className={`w-full h-[55px] font-bold rounded-lg text-[16px] transition-colors ${
                                  simValidated 
                                    ? 'bg-gray-300 text-white cursor-not-allowed' 
                                    : 'bg-[#00BFA5] text-white hover:bg-[#00A08A]'
                                }`}
                              >
                                {simValidated ? '검증 완료 ✓' : '유심번호 유효성 체크'}
                              </button>
                            </>
                          ) : (
                            <>
                              {/* 구매처 안내 영역 */}
                              <div className="text-[13px] text-gray-500 mb-3 text-left">
                                유심 구매처: 다이렉트몰, 편의점/마트, 오픈마켓
                              </div>

                              {/* 다이렉트몰 - 전체 너비 (유심 보유 + 유심 미보유 합산 너비와 동일) */}
                              <button
                                onClick={() => setSimBuyPlace('다이렉트몰')}
                                className={`w-full h-[200px] rounded-[12px] border flex flex-col items-center justify-center transition-colors relative mb-3 ${
                                  simBuyPlace === '다이렉트몰'
                                    ? 'border-[#00BFA5] bg-[#E0F7F4]'
                                    : 'border-gray-200 bg-white'
                                }`}
                              >
                                <div className="text-[40px] mb-3">🚚</div>
                                <div className="font-bold text-black text-[18px] mb-1">다이렉트몰 (바로배송)</div>
                                <div className="text-[14px] text-gray-500 mb-4">오늘 신청, 오늘 받기</div>
                                {simBuyPlace === '다이렉트몰' && (
                                  <div className="w-[20px] h-[20px] rounded-full bg-[#00BFA5] flex items-center justify-center absolute bottom-5">
                                    <Check className="w-3 h-3 text-white stroke-[3]" />
                                  </div>
                                )}
                              </button>

                              {/* 편의점/마트 + 오픈마켓 - 2열 그리드 (다이렉트몰과 동일 전체 너비) */}
                              <div className="grid grid-cols-2 gap-3">
                                <button
                                  onClick={() => setSimBuyPlace('편의점/마트')}
                                  className={`h-[120px] rounded-[12px] border flex flex-col items-center justify-center transition-colors relative ${
                                    simBuyPlace === '편의점/마트'
                                      ? 'border-[#00BFA5] bg-[#E0F7F4]'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                >
                                  <div className="text-[30px] mb-2">🏪</div>
                                  <div className="font-bold text-black text-[15px] mb-0.5">편의점/마트</div>
                                  <div className="text-[12px] text-gray-400">GS25, CU, 이마트 등</div>
                                  {simBuyPlace === '편의점/마트' && (
                                    <div className="w-[18px] h-[18px] rounded-full bg-[#00BFA5] flex items-center justify-center absolute bottom-4">
                                      <Check className="w-3 h-3 text-white stroke-[3]" />
                                    </div>
                                  )}
                                </button>
                                <button
                                  onClick={() => setSimBuyPlace('오픈마켓')}
                                  className={`h-[120px] rounded-[12px] border flex flex-col items-center justify-center transition-colors relative ${
                                    simBuyPlace === '오픈마켓'
                                      ? 'border-[#00BFA5] bg-[#E0F7F4]'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                >
                                  <div className="text-[30px] mb-2">🛒</div>
                                  <div className="font-bold text-black text-[15px] mb-0.5">오픈마켓</div>
                                  <div className="text-[12px] text-gray-400">쿠팡, 11번가, G마켓 등</div>
                                  {simBuyPlace === '오픈마켓' && (
                                    <div className="w-[18px] h-[18px] rounded-full bg-[#00BFA5] flex items-center justify-center absolute bottom-4">
                                      <Check className="w-3 h-3 text-white stroke-[3]" />
                                    </div>
                                  )}
                                </button>
                              </div>

                              {/* 배송지 정보 영역 */}
                              {simBuyPlace === '다이렉트몰' && (
                                <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <div className="flex justify-between items-end mb-3">
                                    <div className="text-[15px] font-bold text-black">배송지 정보</div>
                                    <button 
                                      onClick={() => handleOpenAddressModal('shipping')}
                                      className="text-[#00BFA5] text-[13px] font-medium flex items-center gap-1 hover:text-[#009b86] transition-colors"
                                    >
                                      수정 ✎
                                    </button>
                                  </div>
                                  <div className="w-full bg-white border border-gray-200 rounded-[8px] py-5 px-6">
                                    {(!isShippingAddressModified && !zipcode) ? (
                                      <div className="text-gray-400 text-[14px]">위에서 주소를 먼저 입력해 주세요.</div>
                                    ) : (
                                      <>
                                        <div className="flex items-start gap-3 mb-4">
                                          <div className="mt-0.5 w-[22px] h-[22px] rounded-full bg-[#E0F7F4] text-[#00BFA5] flex items-center justify-center text-[12px]">📍</div>
                                          <div>
                                            <div className="text-black font-bold text-[15px] mb-1">
                                              [{isShippingAddressModified ? shippingAddress.zonecode : zipcode}]
                                            </div>
                                            <div className="text-[14px] text-gray-800">
                                              {isShippingAddressModified ? shippingAddress.address : address}
                                            </div>
                                            <div className="text-[14px] text-gray-800 mt-0.5">
                                              {isShippingAddressModified ? shippingAddress.detailAddress : detailAddress}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="text-[12px] text-gray-500 flex flex-col gap-1 border-t border-gray-100 pt-3 mt-2">
                                          <div>• {isShippingAddressModified ? "다른 주소로 변경되었습니다." : "위에서 입력하신 주소가 자동으로 적용되었습니다."}</div>
                                          <div>• 다른 주소로 받으시려면 우측 상단 '수정' 버튼을 눌러주세요.</div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* 하단 네비게이션 버튼 (이전 / 다음) */}
              <div className="flex justify-center gap-4 mb-16">
                <button
                  onClick={() => goToStep(1)}
                  className="w-[200px] h-[60px] rounded-lg bg-[#F5F5F5] hover:bg-gray-200 text-black text-[16px] font-bold transition-colors"
                >
                  이전
                </button>
                <button
                  disabled={!isStep2Valid}
                  onClick={() => goToStep(3)}
                  className={`w-[200px] h-[60px] rounded-lg text-[16px] font-bold transition-colors ${
                    isStep2Valid ? 'bg-black text-white hover:bg-gray-800 cursor-pointer' : 'bg-[#E5E5E5] text-gray-500 cursor-not-allowed'
                  }`}
                >
                  다음
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 3 ================= */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-10">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <h2 className="text-[20px] font-bold text-black">가입신청 정보</h2>
              </div>

              <div className="flex flex-col gap-14 mb-16">
                {/* 1. 사용중인 통신사 */}
                <div className="flex items-start">
                  <div className="w-[200px] flex-shrink-0 pt-3">
                    <h3 className="text-[16px] font-bold text-black">사용중인 통신사</h3>
                  </div>
                  <div className="w-[540px]">
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {['SK텔레콤', 'LG유플러스', 'KT', '알뜰폰'].map(tc => (
                        <button 
                          key={tc}
                          onClick={() => setTelecom(tc)}
                          className={`h-[60px] rounded-lg border bg-white flex items-center justify-center relative transition-colors ${
                            telecom === tc ? 'border-blue-500 border-dashed border-[2px] text-black font-bold' : 'border-gray-200 text-black hover:border-gray-300'
                          }`}
                        >
                          <span className="text-[14px]">{tc}</span>
                          {telecom === tc && <Check className="w-4 h-4 text-black absolute top-2 right-2" strokeWidth={3} />}
                        </button>
                      ))}
                    </div>
                    <div className="bg-[#F5F5F5] rounded-xl p-5 space-y-2">
                      <p className="flex gap-1.5 text-[13px] text-[#E60012]"><span className="mt-0.5 text-[10px]">•</span><span>통신사를 모르실 경우 현재 사용중인 휴대폰에서 114로 확인 바랍니다.</span></p>
                      <p className="flex gap-1.5 text-[13px] text-[#E60012]"><span className="mt-0.5 text-[10px]">•</span><span>현재 사용중인 통신사가 목록에 없을 경우 챗봇에서 '통신사명 확인'으로 검색하시면 대체 선택 통신사 확인이 가능합니다.</span></p>
                      <p className="flex gap-1.5 text-[13px] text-gray-600"><span className="mt-0.5 text-[10px] text-gray-400">•</span><span>타사 신규개통/명의변경/번호이동 후 3개월 이내 고객은 셀프개통으로 번호이동이 불가하므로 온라인 가입신청을 부탁드립니다.</span></p>
                    </div>
                  </div>
                </div>

                {/* 2. 번호이동할 전화번호 */}
                <div className="flex items-start">
                  <div className="w-[200px] flex-shrink-0 pt-3">
                    <h3 className="text-[16px] font-bold text-black">번호이동할 전화번호</h3>
                  </div>
                  <div className="w-[540px]">
                    <input 
                      type="text" 
                      placeholder="휴대폰" 
                      value={movingPhone}
                      onChange={e => setMovingPhone(e.target.value)}
                      className="w-1/2 h-[50px] px-4 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-black mb-4" 
                    />
                    <div className="bg-[#F5F5F5] rounded-xl p-5 space-y-2">
                      <p className="flex gap-1.5 text-[13px] text-gray-600">
                        <span className="mt-0.5 text-[10px] text-gray-400">•</span>
                        <span>번호이동을 위해서는 현재 사용중인 통신사에서의 인증 절차가 필요합니다. <span onClick={() => setShowConsentMethodModal(true)} className="text-[#00BFA5] underline ml-1 cursor-pointer">[사전동의 방법]</span></span>
                      </p>
                      <p className="flex gap-1.5 text-[13px] text-gray-600">
                        <span className="mt-0.5 text-[10px] text-gray-400">•</span>
                        <span>번호이동 사전동의는 일 7회로 제한됩니다.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 동적 ARS 안내 영역 */}
              {isConsentRequested && (
                <div className="flex flex-col items-center mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[#E60012] text-[16px] font-bold">문자 내 URL로 또는 전화를 걸어 ARS 안내에 따라 동의</span>
                    <span className="text-gray-500 text-[14px]">(1~2분 소요)</span>
                  </div>
                  <div className="w-[540px] bg-white border border-black rounded-lg py-8 flex flex-col items-center justify-center mb-4">
                    <div className="text-black text-[16px] mb-2">{telecom}</div>
                    <div className="text-black text-[34px] font-bold tracking-tight">
                      {telecom === 'SK텔레콤' ? '1566-1509' : telecom === 'LG유플러스' ? '1544-3553' : '1588-2935'}
                    </div>
                  </div>
                  <div className="text-black text-[15px]">동의 후 아래 완료 버튼을 눌러주세요.</div>
                </div>
              )}

              <div className="flex justify-center gap-4 mb-16 mt-10">
                <button
                  onClick={() => goToStep(2)}
                  className="w-[200px] h-[60px] rounded-lg bg-[#F5F5F5] hover:bg-gray-200 text-black text-[16px] font-bold transition-colors"
                >
                  이전
                </button>
                <button
                  disabled={!isStep3Valid}
                  onClick={() => {
                    if (!isConsentRequested) {
                      setShowConsentRequestModal(true);
                    } else {
                      goToStep(4);
                    }
                  }}
                  className={`w-[200px] h-[60px] rounded-lg text-[16px] font-bold transition-colors ${
                    isStep3Valid ? 'bg-black text-white hover:bg-gray-800 cursor-pointer' : 'bg-[#E5E5E5] text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isConsentRequested ? '동의 완료' : '사전동의 요청'}
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 4 ================= */}
          {currentStep === 4 && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <h2 className="text-[20px] font-bold text-black">부가서비스 정보</h2>
              </div>

              <div className="flex flex-col gap-14 mb-16">
                {/* 1. 친구초대 추천인 ID */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[16px] font-bold text-black">친구초대 추천인ID</h3>
                    <span className="text-[13px] text-gray-500">(선택)</span>
                  </div>
                  <div className="flex gap-2 relative">
                    <div className="w-1/2 relative">
                      <button 
                        onClick={() => setShowRecommendDropdown(!showRecommendDropdown)}
                        className={`w-full h-[50px] px-4 bg-white border rounded-lg flex items-center justify-between text-[15px] outline-none transition-colors hover:bg-gray-50 ${showRecommendDropdown ? 'border-blue-500 border-dashed' : 'border-gray-300'}`}
                      >
                        <span className="text-gray-400">친구초대 추천인 ID</span>
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </button>
                      {showRecommendDropdown && (
                        <div className="absolute top-[55px] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-2 animate-in fade-in slide-in-from-top-1">
                          <button onClick={() => setShowRecommendDropdown(false)} className="w-full px-4 py-2.5 text-left text-[14px] hover:bg-gray-50">추천인ID 없음</button>
                          <button onClick={() => setShowRecommendDropdown(false)} className="w-full px-4 py-2.5 text-left text-[14px] hover:bg-gray-50">M모바일 고객 추천</button>
                          <button onClick={() => setShowRecommendDropdown(false)} className="w-full px-4 py-2.5 text-left text-[14px] hover:bg-gray-50">임직원 추천</button>
                        </div>
                      )}
                    </div>
                    <div className="w-1/2">
                      <input 
                        type="text" 
                        placeholder="직접입력" 
                        value={recommendId}
                        onChange={e => setRecommendId(e.target.value)}
                        className="w-full h-[50px] px-4 bg-white border border-gray-300 rounded-lg text-[15px] outline-none focus:border-blue-500 focus:border-dashed" 
                      />
                    </div>
                  </div>
                  <div className="text-[13px] text-gray-500 flex items-center gap-1.5">
                    <span className="text-[10px]">•</span>
                    <span>추천인ID 오/미입력 시 사은품 지급이 불가하니 정확히 입력 해주세요.</span>
                  </div>
                </div>

                {/* 2. 아무나 SOLO 결합 가입 */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 relative" 
                         onMouseEnter={() => setShowSoloTooltip(true)} 
                         onMouseLeave={() => setShowSoloTooltip(false)}>
                      <h3 className="text-[16px] font-bold text-black">아무나 SOLO 결합 가입</h3>
                      <Info className="w-[18px] h-[18px] text-gray-400 cursor-pointer hover:text-black transition-colors" />
                      {showSoloTooltip && (
                        <div className="absolute top-full left-0 mt-2 w-[420px] bg-white border border-gray-200 shadow-[0_4px_16px_rgba(0,0,0,0.1)] rounded-lg p-4 z-50 animate-in fade-in slide-in-from-top-1">
                          <div className="font-bold text-black mb-2 text-[15px]">아무나 SOLO 결합</div>
                          <ul className="text-[13px] text-gray-600 space-y-1.5">
                            <li className="flex gap-1.5"><span className="text-[10px] mt-0.5">•</span><span>대상 요금제 가입 시 매월 추가 데이터를 제공하는 1인 결합 서비스입니다.</span></li>
                            <li className="flex gap-1.5"><span className="text-[10px] mt-0.5">•</span><span>신청 시 개통과 함께 자동 적용되며 즉시 데이터가 제공됩니다.</span></li>
                            <li className="flex gap-1.5"><span className="text-[10px] mt-0.5">•</span><span>개통 후에도 별도 신청이 가능하며, 약정이나 위약금은 없습니다.</span></li>
                            <li className="flex gap-1.5"><span className="text-[10px] mt-0.5">•</span><span>요금제 변경 시 요금제에 따라 데이터의 제공량이 달라지거나, 결합이 해지 될 수 있습니다.</span></li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <span className="text-[13px] text-gray-500">(선택)</span>
                  </div>

                  <div className="w-full bg-[#F8FAFC] rounded-lg p-6 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="text-[15px] text-black mb-1">아무나 SOLO 결합을 신청하실 경우</div>
                    <div className="text-[18px] font-bold text-[#3B82F6]">LTE 데이터 추가제공 5GB(결합)이 제공됩니다.</div>
                    <Settings className="w-20 h-20 text-[#3B82F6] opacity-[0.08] absolute right-8 top-1/2 -translate-y-1/2" />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSoloCombine('나중에 신청')}
                      className={`w-1/2 h-[60px] rounded-lg border flex items-center justify-center text-[16px] transition-colors relative ${soloCombine === '나중에 신청' ? 'border-black text-black font-bold bg-white' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'}`}
                    >
                      나중에 신청
                      {soloCombine === '나중에 신청' && <Check className="w-5 h-5 absolute right-4 stroke-[3]" />}
                    </button>
                    <button 
                      onClick={() => setSoloCombine('결합 신청')}
                      className={`w-1/2 h-[60px] rounded-lg border flex items-center justify-center text-[16px] transition-colors relative ${soloCombine === '결합 신청' ? 'border-black text-black font-bold bg-white' : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'}`}
                    >
                      결합 신청
                      {soloCombine === '결합 신청' && <Check className="w-5 h-5 absolute right-4 stroke-[3]" />}
                    </button>
                  </div>

                  {soloCombine === '결합 신청' && (
                    <div className="w-full bg-[#F5F5F5] border border-gray-200 rounded-lg p-4 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center transition-colors ${isSoloCombineAgreed ? 'bg-[#00BFA5]' : 'bg-white border border-gray-300'}`}>
                          {isSoloCombineAgreed && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>
                        <span className="text-[15px] text-black font-medium">결합을 위한 필수 확인사항 동의 <span className="text-[#E60012]">(필수)</span></span>
                      </div>
                      <button onClick={() => setShowSoloModal(true)} className="p-2 hover:bg-gray-200 rounded-full transition-colors flex items-center justify-center">
                        <Pointer className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. 부가서비스 신청 */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-[16px] font-bold text-black">부가서비스 신청</h3>
                    <span className="text-[13px] text-gray-500">(선택)</span>
                  </div>

                  {/* 캐치콜 플러스 */}
                  <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-colors hover:border-gray-300">
                    <div className="p-5 flex items-start justify-between cursor-pointer" onClick={() => setIsCatchcallExpanded(!isCatchcallExpanded)}>
                      <div className="flex items-start gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedAddons(prev => prev.includes('캐치콜 플러스') ? prev.filter(a => a !== '캐치콜 플러스') : [...prev, '캐치콜 플러스']); }}
                          className={`w-6 h-6 rounded border mt-0.5 flex items-center justify-center transition-colors ${selectedAddons.includes('캐치콜 플러스') ? 'bg-[#00BFA5] border-[#00BFA5]' : 'bg-white border-gray-300 hover:border-gray-400'}`}
                        >
                          {selectedAddons.includes('캐치콜 플러스') && <Check className="w-4 h-4 text-white stroke-[3]" />}
                        </button>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-1.5 py-0.5 border border-[#E60012] text-[#E60012] text-[11px] font-bold rounded">추천</span>
                            <span className="font-bold text-[16px] text-black">캐치콜 플러스(월 880원)</span>
                          </div>
                          <div className="text-[14px] text-gray-500">놓친 전화도 문자로 딱! 중요한 순간을 지켜드립니다.</div>
                        </div>
                      </div>
                      <div className="text-[#00BFA5] text-[13px] font-bold flex items-center gap-1 mt-1">
                        자세히보기 {isCatchcallExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                    {isCatchcallExpanded && (
                      <div className="px-6 pb-6 pt-3 border-t border-gray-100 bg-[#F8FAFC] animate-in fade-in slide-in-from-top-2">
                        <div className="text-[13px] text-gray-700 mb-4 leading-relaxed">
                          • 서비스 정의: 내가 놓친 전화를 문자로 알려주는 캐치콜 서비스와 상대방의 통화가능 상태를 문자로 알려주는 통화가능알리미 서비스를 묶은 알뜰패키지 상품입니다.
                          <div className="text-[12px] text-gray-500 mt-1.5 ml-2">※ 수신 상대방이 kt망을 사용하는 모바일 고객인 경우에만 서비스가 제공되며, 기타망 및 유선고객일 경우 제공되지 않습니다.</div>
                        </div>
                        <div className="flex gap-4 mb-5">
                          <div className="w-1/2 bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                              <PhoneOff className="w-10 h-10 text-[#E60012] p-2 bg-red-50 rounded-full" />
                              <div className="text-[12px] font-bold bg-gray-100 p-2.5 rounded text-gray-700 w-full relative">
                                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-gray-100 w-0 h-0"></div>
                                [캐치콜&lt;전원꺼짐&gt;]<br/>25/05/15 10:19<br/><span className="text-[#00BFA5]">0101112222</span>님이 전화하셨습니다.
                              </div>
                            </div>
                            <div className="text-[13px] text-gray-600 leading-tight">휴대폰이 꺼져있는 상태에서<br/><span className="text-[#3B82F6] font-bold">[온 전화를 문자메시지로]</span> 알려줍니다.</div>
                          </div>
                          <div className="w-1/2 bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                              <Phone className="w-10 h-10 text-[#3B82F6] p-2 bg-blue-50 rounded-full" />
                              <div className="text-[12px] font-bold bg-gray-100 p-2.5 rounded text-gray-700 w-full relative">
                                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 border-y-4 border-r-4 border-y-transparent border-r-gray-100 w-0 h-0"></div>
                                [통화가능알림]<br/>0103334444로 통화 가능합니다. 연결하려면 통화 버튼을 눌러주세요.
                              </div>
                            </div>
                            <div className="text-[13px] text-gray-600 leading-tight">상대방이 통화 중이라 연결이 안될때,<br/><span className="text-[#3B82F6] font-bold">[상대방 통화가 끝나면 문자로]</span> 알려줍니다.</div>
                          </div>
                        </div>
                        <ul className="text-[13px] text-gray-600 space-y-1.5 ml-1">
                          <li>• 서비스 이용요금 (VAT포함): 880원</li>
                          <li>• 서비스 신청방법: 요금제 가입시 신청가능 / 고객센터(1899-5000, 무료 ktM모바일 114)를 통해 가입 및 해지</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 통화중대기 설정/해제 (무료) */}
                  <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden transition-colors hover:border-gray-300">
                    <div className="p-5 flex items-start justify-between cursor-pointer" onClick={() => setIsWaitcallExpanded(!isWaitcallExpanded)}>
                      <div className="flex items-start gap-3">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedAddons(prev => prev.includes('통화중대기 설정/해제 (무료)') ? prev.filter(a => a !== '통화중대기 설정/해제 (무료)') : [...prev, '통화중대기 설정/해제 (무료)']); }}
                          className={`w-6 h-6 rounded border mt-0.5 flex items-center justify-center transition-colors ${selectedAddons.includes('통화중대기 설정/해제 (무료)') ? 'bg-[#00BFA5] border-[#00BFA5]' : 'bg-white border-gray-300 hover:border-gray-400'}`}
                        >
                          {selectedAddons.includes('통화중대기 설정/해제 (무료)') && <Check className="w-4 h-4 text-white stroke-[3]" />}
                        </button>
                        <div>
                          <div className="font-bold text-[16px] text-black mb-1">통화중대기 설정/해제 (무료)</div>
                          <div className="text-[14px] text-gray-500">현재 통화는 잠시 대기, 새 전화는 바로 연결</div>
                        </div>
                      </div>
                      <div className="text-[#00BFA5] text-[13px] font-bold flex items-center gap-1 mt-1">
                        자세히보기 {isWaitcallExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                    {isWaitcallExpanded && (
                      <div className="px-6 pb-6 pt-3 border-t border-gray-100 bg-[#F8FAFC] animate-in fade-in slide-in-from-top-2">
                        <div className="text-[13px] text-gray-700 mb-3 leading-relaxed">• 서비스 정의: 통화 중에 다른 전화가 걸려오면 현재 통화를 잠시 대기시키고 새로 걸려온 전화를 받을 수 있는 서비스입니다.</div>
                        <ul className="text-[13px] text-gray-600 space-y-1.5 ml-1">
                          <li>• 이용요금: 무료</li>
                          <li>• 신청방법: *40 + 통화 (설정) / *400 + 통화 (해제)</li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* 선택된 부가서비스 요약 */}
                  <div className="w-full bg-[#F5F5F5] rounded-lg p-6">
                    <div className="font-bold text-black text-[16px] mb-4">선택한 부가서비스({selectedAddons.length}개)</div>
                    {selectedAddons.length === 0 ? (
                      <div className="text-gray-500 text-[14px] text-center mb-6 pt-2 pb-4">선택된 부가서비스가 없습니다.</div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedAddons.map(addon => (
                          <div key={addon} className="pl-4 pr-2 py-2 bg-white border border-gray-300 rounded-full text-[14px] text-black font-medium flex items-center gap-2 shadow-sm">
                            {addon}
                            <button onClick={() => setSelectedAddons(prev => prev.filter(a => a !== addon))} className="w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                              <X className="w-3.5 h-3.5 text-gray-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-center">
                      <button onClick={() => setShowAddonModal(true)} className="px-8 py-3.5 bg-black text-white rounded-lg text-[15px] font-bold hover:bg-gray-800 transition-colors shadow-md">
                        기타 부가서비스 선택하기
                      </button>
                    </div>
                  </div>

                  {/* 부가서비스 합계 표시 영역 */}
                  <div className="w-full bg-[#F8FAFC] py-5 px-6 flex items-center justify-between border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-black text-[16px]">부가서비스 합계</span>
                      <span className="text-[13px] text-gray-500 font-medium">(VAT 포함)</span>
                    </div>
                    <div className="font-bold text-[24px] text-[#E60012]">{addonSum.toLocaleString()}원</div>
                  </div>
                  <div className="text-[13px] text-gray-500 px-2">
                    <span className="mr-1.5">•</span>개통 시 기본제공 되는 부가서비스는 상품소개 페이지를 참고 부탁드리며, 부가서비스는 홈페이지, App, 고객센터를 통해 추가로 가입/해지가 가능합니다.
                  </div>
                </div>

                {/* 4. 휴대폰안심보험 신청 */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-[16px] font-bold text-black">휴대폰안심보험 신청</h3>
                      <span className="text-[13px] text-gray-500">(선택)</span>
                    </div>
                    <button onClick={() => setShowInsuranceModal(true)} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-black hover:bg-gray-50 transition-colors shadow-sm">
                      휴대폰안심보험 신청/변경
                    </button>
                  </div>
                  
                  <div className="w-full py-16 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                    <div className="relative mb-4">
                      <FileText className="w-16 h-16 text-gray-200" />
                      <Search className="w-8 h-8 text-gray-300 absolute -bottom-2 -right-2 bg-gray-50 rounded-full p-1" />
                    </div>
                    {insurance === '미가입' ? (
                      <div className="text-[15px] text-gray-500 font-medium">선택한 휴대폰안심보험 서비스가 없습니다.</div>
                    ) : (
                      <div className="text-[16px] font-bold text-[#00BFA5] border border-[#00BFA5] bg-white px-8 py-3 rounded-full shadow-sm">
                        {insurance}
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* 하단 버튼 */}
              <div className="flex justify-center gap-4 mb-16 mt-10">
                <button
                  onClick={() => goToStep(3)}
                  className="w-[200px] h-[60px] rounded-lg bg-[#F5F5F5] hover:bg-gray-200 text-black text-[16px] font-bold transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={() => goToStep(5)}
                  className="w-[200px] h-[60px] rounded-lg bg-black hover:bg-gray-800 text-white text-[16px] font-bold transition-colors"
                >
                  다음
                </button>
              </div>
            </div>
          )}
          {/* ================= STEP 5 ================= */}
          {currentStep === 5 && (
            <div className="animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">5</span>
                </div>
                <h2 className="text-[24px] font-bold text-black">납부정보·가입정보 확인</h2>
              </div>

              <div className="flex flex-col gap-12 mb-16">
                {/* 1. 명세서 수신 유형 */}
                <div>
                  <h3 className="text-[16px] font-bold text-black mb-4">명세서 수신 유형</h3>
                  <div className="flex gap-3 mb-3">
                    {[
                      { type: '이메일 명세서', icon: <Mail className={`w-6 h-6 ${billType === '이메일 명세서' ? 'text-black' : 'text-gray-400'}`} /> },
                      { type: '모바일 명세서(MMS)', icon: <MessageSquare className={`w-6 h-6 ${billType === '모바일 명세서(MMS)' ? 'text-black' : 'text-gray-400'}`} /> },
                      { type: '우편 명세서', icon: <Mails className={`w-6 h-6 ${billType === '우편 명세서' ? 'text-black' : 'text-gray-400'}`} /> }
                    ].map(item => (
                      <button
                        key={item.type}
                        onClick={() => !isPaymentValidated && setBillType(item.type as any)}
                        disabled={isPaymentValidated}
                        className={`flex-1 h-[64px] rounded flex items-center justify-center gap-2 border transition-colors relative 
                          ${isPaymentValidated ? 'bg-gray-50 border-gray-200 text-gray-400' : ''}
                          ${!isPaymentValidated && billType === item.type ? 'border-black border-[1.5px] font-bold text-black' : ''}
                          ${!isPaymentValidated && billType !== item.type ? 'border-[#E5E5E5] text-gray-400 hover:bg-gray-50' : ''}
                        `}
                      >
                        {item.icon}
                        <span className="text-[15px]">{item.type}</span>
                        {billType === item.type && <Check className={`w-5 h-5 absolute right-4 stroke-[3] ${isPaymentValidated ? 'text-gray-400' : 'text-black'}`} />}
                      </button>
                    ))}
                  </div>
                  <div className="text-[13px] text-gray-500 flex items-center gap-1">
                    <span className="mt-0.5">•</span>
                    <span>이메일, 모바일(MMS) 명세서를 선택 하시면 청구내역을 빠르고 정확하게 받아보실 수 있습니다.</span>
                  </div>
                </div>

                {/* 2. 요금 납부 방법 */}
                <div>
                  <h3 className="text-[16px] font-bold text-black mb-4">요금 납부 방법</h3>
                  <div className="flex gap-3">
                    {[
                      { method: '자동이체' },
                      { method: '신용카드' }
                    ].map(item => (
                      <button
                        key={item.method}
                        onClick={() => !isPaymentValidated && setPayMethod(item.method as any)}
                        disabled={isPaymentValidated}
                        className={`flex-1 h-[56px] rounded flex items-center justify-center border transition-colors relative
                          ${isPaymentValidated ? 'bg-gray-50 border-gray-200 text-gray-400' : ''}
                          ${!isPaymentValidated && payMethod === item.method ? 'border-black border-[1.5px] font-bold text-black' : ''}
                          ${!isPaymentValidated && payMethod !== item.method ? 'border-[#E5E5E5] text-gray-400 hover:bg-gray-50' : ''}
                        `}
                      >
                        <span className="text-[16px]">{item.method}</span>
                        {payMethod === item.method && <Check className={`w-5 h-5 absolute right-4 stroke-[3] ${isPaymentValidated ? 'text-gray-400' : 'text-black'}`} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. 계좌/카드 정보 */}
                <div>
                  {payMethod === '자동이체' ? (
                    <>
                      <h3 className="text-[16px] font-bold text-black mb-4">계좌정보</h3>
                      <div className="flex gap-3 mb-4 relative z-10">
                        <div className="w-1/2 relative">
                          <button 
                            onClick={() => !isPaymentValidated && setShowBankDropdown(!showBankDropdown)}
                            disabled={isPaymentValidated}
                            className={`w-full h-[50px] px-4 border rounded flex items-center justify-between text-[15px] outline-none transition-colors 
                              ${isPaymentValidated ? 'bg-gray-50 border-gray-200' : 'bg-white hover:border-black focus:border-black'} 
                              ${showBankDropdown ? 'border-black' : 'border-gray-300'}`}
                          >
                            <div className="flex flex-col items-start justify-center h-full relative w-full">
                              <label className={`absolute transition-all duration-200 pointer-events-none ${isPaymentValidated ? 'text-gray-400' : 'text-gray-500'} ${bankName ? 'top-1.5 text-[11px]' : 'top-3.5 text-[15px] text-gray-400'}`}>
                                은행명
                              </label>
                              {bankName && <span className={`mt-3.5 text-[15px] block truncate w-full text-left ${isPaymentValidated ? 'text-gray-400' : 'text-black'}`}>{bankName}</span>}
                            </div>
                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isPaymentValidated ? 'text-gray-300' : 'text-gray-400'}`} />
                          </button>
                          
                          {showBankDropdown && (
                            <div className="absolute top-[55px] left-0 w-full max-h-[250px] overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-20 py-2 animate-in fade-in slide-in-from-top-1">
                              {[
                                '국민은행', '기업은행', '농협', '아이엠뱅크', '부산은행', '산업은행', 
                                '새마을금고', '수협중앙', '신협', '신한은행', '우리은행', '우체국', 
                                '전북은행', '제주은행', 'SC제일은행', 'KEB하나은행', '시티은행', 
                                '케이뱅크', '카카오뱅크'
                              ].map(bank => (
                                <button 
                                  key={bank}
                                  onClick={() => { setBankName(bank); setShowBankDropdown(false); }} 
                                  className="w-full px-4 py-2.5 text-left text-[14px] text-black hover:bg-gray-50 transition-colors"
                                >
                                  {bank}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="w-1/2 relative">
                          <div className={`w-full h-[50px] border rounded relative transition-colors ${isPaymentValidated ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 focus-within:border-black'}`}>
                            <input 
                              type="text" 
                              value={accountNumber}
                              onChange={e => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
                              placeholder="'-'없이 입력"
                              readOnly={isPaymentValidated}
                              className={`peer w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none text-[15px] placeholder-transparent 
                                ${isPaymentValidated ? 'text-gray-400 cursor-not-allowed' : 'text-black focus:placeholder-gray-300'}`} 
                            />
                            <label className={`absolute left-4 transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] 
                              ${isPaymentValidated ? 'text-gray-400' : 'peer-focus:text-gray-500'} 
                              ${accountNumber ? `top-1.5 text-[11px] ${isPaymentValidated ? 'text-gray-400' : 'text-gray-500'}` : 'top-3.5 text-[15px] text-gray-400'}`}>
                              계좌번호
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#F7F7F7] p-4 rounded text-[13px] text-gray-500 mb-6 flex flex-col gap-1.5">
                        <div className="flex gap-1.5 items-start">
                          <span className="mt-0.5">•</span>
                          <span>납부방법은 본인명의의 카드 또는 계좌로만 등록 가능합니다.(미성년자의 경우 법정대리인 명의 포함)</span>
                        </div>
                        <div className="flex gap-1.5 items-start">
                          <span className="mt-0.5">•</span>
                          <span>매월 21일 납부</span>
                        </div>
                        <div className="flex gap-1.5 items-start">
                          <span className="mt-0.5">•</span>
                          <span>평생계좌(개인 핸드폰번호를 계좌번호로 사용하는 계좌)는 이용 불가능합니다.</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-[16px] font-bold text-black mb-4">신용카드 정보</h3>
                      <div className="mb-6 relative">
                        <div className={`w-full h-[50px] border rounded relative transition-colors ${isPaymentValidated ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300 focus-within:border-black'}`}>
                          <input 
                            type="text" 
                            value={cardNumber}
                            onChange={e => setCardNumber(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="'-'없이 입력"
                            readOnly={isPaymentValidated}
                            className={`peer w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none text-[15px] placeholder-transparent 
                              ${isPaymentValidated ? 'text-gray-400 cursor-not-allowed' : 'text-black focus:placeholder-gray-300'}`} 
                          />
                          <label className={`absolute left-4 transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] 
                            ${isPaymentValidated ? 'text-gray-400' : 'peer-focus:text-gray-500'} 
                            ${cardNumber ? `top-1.5 text-[11px] ${isPaymentValidated ? 'text-gray-400' : 'text-gray-500'}` : 'top-3.5 text-[15px] text-gray-400'}`}>
                            카드번호
                          </label>
                        </div>
                      </div>

                      <h3 className="text-[16px] font-bold text-black mb-4">신용카드 유효기간</h3>
                      <div className="flex gap-3 mb-6 relative z-0">
                        <div className="w-1/2 relative">
                          <button 
                            onClick={() => !isPaymentValidated && setShowExpMonthDropdown(!showExpMonthDropdown)}
                            disabled={isPaymentValidated}
                            className={`w-full h-[50px] px-4 border rounded flex items-center justify-between text-[15px] outline-none transition-colors 
                              ${isPaymentValidated ? 'bg-gray-50 border-gray-200' : 'bg-white hover:border-black focus:border-black'} 
                              ${showExpMonthDropdown ? 'border-black' : 'border-gray-300'}`}
                          >
                            <div className="flex flex-col items-start justify-center h-full relative w-full">
                              <label className={`absolute transition-all duration-200 pointer-events-none ${isPaymentValidated ? 'text-gray-400' : 'text-gray-500'} ${cardExpMonth ? 'top-1.5 text-[11px]' : 'top-3.5 text-[15px] text-gray-400'}`}>
                                MM
                              </label>
                              {cardExpMonth && <span className={`mt-3.5 text-[15px] block truncate w-full text-left ${isPaymentValidated ? 'text-gray-400' : 'text-black'}`}>{cardExpMonth}</span>}
                            </div>
                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isPaymentValidated ? 'text-gray-300' : 'text-gray-400'}`} />
                          </button>
                          
                          {showExpMonthDropdown && (
                            <div className="absolute top-[55px] left-0 w-full max-h-[250px] overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-20 py-2 animate-in fade-in slide-in-from-top-1">
                              {Array.from({length: 12}, (_, i) => `${i + 1}월`).map(month => (
                                <button 
                                  key={month}
                                  onClick={() => { setCardExpMonth(month); setShowExpMonthDropdown(false); }} 
                                  className="w-full px-4 py-2.5 text-left text-[14px] text-black hover:bg-gray-50 transition-colors"
                                >
                                  {month}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="w-1/2 relative">
                          <button 
                            onClick={() => !isPaymentValidated && setShowExpYearDropdown(!showExpYearDropdown)}
                            disabled={isPaymentValidated}
                            className={`w-full h-[50px] px-4 border rounded flex items-center justify-between text-[15px] outline-none transition-colors 
                              ${isPaymentValidated ? 'bg-gray-50 border-gray-200' : 'bg-white hover:border-black focus:border-black'} 
                              ${showExpYearDropdown ? 'border-black' : 'border-gray-300'}`}
                          >
                            <div className="flex flex-col items-start justify-center h-full relative w-full">
                              <label className={`absolute transition-all duration-200 pointer-events-none ${isPaymentValidated ? 'text-gray-400' : 'text-gray-500'} ${cardExpYear ? 'top-1.5 text-[11px]' : 'top-3.5 text-[15px] text-gray-400'}`}>
                                YY
                              </label>
                              {cardExpYear && <span className={`mt-3.5 text-[15px] block truncate w-full text-left ${isPaymentValidated ? 'text-gray-400' : 'text-black'}`}>{cardExpYear}</span>}
                            </div>
                            <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isPaymentValidated ? 'text-gray-300' : 'text-gray-400'}`} />
                          </button>
                          
                          {showExpYearDropdown && (
                            <div className="absolute top-[55px] left-0 w-full max-h-[250px] overflow-y-auto bg-white border border-gray-200 rounded shadow-lg z-20 py-2 animate-in fade-in slide-in-from-top-1">
                              {Array.from({length: 11}, (_, i) => `${2026 + i}년`).map(year => (
                                <button 
                                  key={year}
                                  onClick={() => { setCardExpYear(year); setShowExpYearDropdown(false); }} 
                                  className="w-full px-4 py-2.5 text-left text-[14px] text-black hover:bg-gray-50 transition-colors"
                                >
                                  {year}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-[#F7F7F7] p-4 rounded text-[13px] text-gray-500 mb-6 flex flex-col gap-1.5">
                        <div className="flex gap-1.5 items-start">
                          <span className="mt-0.5">•</span>
                          <span>납부방법은 본인명의의 카드 또는 계좌로만 등록 가능합니다.(미성년자의 경우 법정대리인 명의 포함)</span>
                        </div>
                        <div className="flex gap-1.5 items-start">
                          <span className="mt-0.5">•</span>
                          <span>1회차 매월 10~11일경</span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* 4. 유효성 체크 버튼 */}
                  <button 
                    onClick={() => setShowValidationModal(true)}
                    disabled={isPaymentValidated}
                    className={`w-full h-[56px] text-white font-bold text-[16px] rounded transition-colors shadow-sm 
                      ${isPaymentValidated ? 'bg-[#9FE5D5] cursor-default' : 'bg-[#3DBFA8] hover:bg-[#32a893]'}`}
                  >
                    {isPaymentValidated 
                      ? (payMethod === '자동이체' ? '계좌번호 체크 완료' : '신용카드 체크 완료')
                      : (payMethod === '자동이체' ? '계좌번호 유효성 체크' : '신용카드 유효성 체크')
                    }
                  </button>
                </div>
              </div>

              {/* 하단 버튼 */}
              <div className="flex justify-center gap-4 mb-16 mt-10">
                <button
                  onClick={() => goToStep(4)}
                  className="w-[200px] h-[56px] rounded bg-[#F3F3F3] hover:bg-gray-200 text-black text-[16px] transition-colors"
                >
                  이전
                </button>
                <button
                  onClick={() => isPaymentValidated && setShowOrderModal(true)}
                  disabled={!isPaymentValidated}
                  className={`w-[200px] h-[56px] rounded text-[16px] transition-colors ${isPaymentValidated ? 'bg-black text-white font-bold hover:bg-gray-800' : 'bg-[#E5E5E5] text-gray-500 cursor-not-allowed'}`}
                >개통 완료</button>
              </div>
            </div>
          )}

          {/* ================= STEP 6 (완료 페이지) ================= */}
          {currentStep === 6 && (
            <div className="animate-in fade-in duration-500 w-full">
              {/* 상단 브레드크럼 라벨 */}
              <div className="flex items-center gap-2 pt-[60px] pb-[80px]">
                <div className="w-1.5 h-1.5 bg-black"></div>
                <span className="text-[16px] font-bold text-black">셀프개통</span>
              </div>

              {/* 메인 콘텐츠 */}
              <div className="flex flex-col items-center justify-center text-center w-full">
                <div className="w-[100px] h-[100px] bg-[#34D4B7] rounded-full flex items-center justify-center mb-[32px] shadow-sm">
                  <Check className="w-12 h-12 text-white stroke-[4]" />
                </div>
                
                <h2 className="text-[32px] text-[#111] mb-[16px] leading-[1.4]">
                  <span className="font-extrabold">셀프개통</span>이 정상적으로<br />
                  <span className="font-extrabold">완료</span>되었습니다.
                </h2>
                
                <p className="text-[16px] text-[#6B7280] mb-[48px]">
                  kt M 모바일과 함께해 주셔서 감사합니다.
                </p>
                
                <div className="flex justify-center gap-[12px] w-full mb-[100px]">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-[200px] h-[56px] rounded-[4px] bg-[#F3F3F3] hover:bg-gray-200 text-black font-medium text-[16px] transition-colors"
                  >
                    메인으로
                  </button>
                  <button
                    className="w-[200px] h-[56px] rounded-[4px] bg-black hover:bg-gray-800 text-white font-bold text-[16px] transition-colors"
                  >SIM 활성화 방법</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white pt-10 pb-8 px-12">
        <div className="max-w-[800px] mx-auto">
          <div className="mb-8">
            <p className="text-white text-lg font-bold mb-4">APP 다운로드</p>
            <div className="flex items-center gap-4">
              <button className="bg-black border border-gray-700 px-5 py-3 rounded text-[13px] text-white flex items-center gap-2">
                <span>▶</span>
                <span>Google Play</span>
              </button>
              <button className="bg-black border border-gray-700 px-5 py-3 rounded text-[13px] text-white flex items-center gap-2">
                <span></span>
                <span>App Store</span>
              </button>
              <div className="ml-auto flex items-center gap-2">
                <select className="bg-black border border-gray-700 px-4 py-2 rounded text-[13px] text-white outline-none">
                  <option>패밀리 사이트 ∨</option>
                </select>
                <button className="bg-black border border-gray-700 px-5 py-2 rounded text-[13px] text-white">
                  이동
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-gray-400 mb-6 pb-6 border-b border-gray-800">
            <a href="#" className="hover:text-white">주식회사 케이티엠모바일</a><span>|</span>
            <a href="#" className="text-white font-bold hover:text-gray-200">개인정보처리방침</a><span>|</span>
            <a href="#" className="hover:text-white">이용약관</a><span>|</span>
            <a href="#" className="hover:text-white">청소년 보호정책</a><span>|</span>
            <a href="#" className="hover:text-white">윤리상담센터</a><span>|</span>
            <a href="#" className="hover:text-white">제휴제안</a><span>|</span>
            <a href="#" className="hover:text-white">공통지원금</a><span>|</span>
            <a href="#" className="hover:text-white">명의도용방지서비스</a><span>|</span>
            <a href="#" className="hover:text-white">서비스커버리지</a>
          </div>
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <span className="font-bold text-white text-lg">kt</span>
              <span className="font-bold text-[#E60012] text-lg ml-1">M mobile</span>
            </div>
            <div className="text-[12px] text-gray-400 leading-relaxed space-y-1">
              <p>주식회사 케이티엠모바일 대표이사 : 김의현 | 주소 : 06193 서울특별시 강남구 테헤란로 422 KT 선릉타워 12층 | 사업자등록번호 : 133-81-43410 | 통신판매업신고 : 2015-서울강남-01576 사업자 정보 확인</p>
              <p className="text-white font-bold">고객센터 : 1899-5000 (무료 kt M모바일 114) 운영시간 : 09~12시 / 13~18시<span className="text-gray-400 font-normal ml-2">토요일, 일요일, 공휴일은 분실, 정지신고 및 통화품질 관련 상담만 가능</span></p>
              <p className="text-[11px] mt-2">Copyright c kt M mobile. All rights reserved.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded text-center"><p className="text-[10px] text-gray-400 leading-tight">과학기술정보통신부<br />웹접근성 인증</p></div>
            <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded text-center"><p className="text-[10px] text-gray-400 leading-tight">2020 국가서비스대상<br />알뜰폰 부문 대상</p></div>
            <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded text-center"><p className="text-[10px] text-gray-400 leading-tight">2025년 콜센터<br />품질지수 알뜰폰 부문<br />우수기업</p></div>
            <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded text-center"><p className="text-[10px] text-gray-400 leading-tight">정보보호<br />관리체계 인증</p></div>
            <div className="bg-gray-900 border border-gray-800 px-4 py-3 rounded text-center"><p className="text-[10px] text-gray-400 leading-tight">Wise User<br />이용자 피해예방</p></div>
          </div>
        </div>
      </footer>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[90px] bg-white border-t border-[#E60012] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
        <div className="max-w-[800px] mx-auto h-full px-6 flex items-center justify-between">
          <div className="text-[14px] text-gray-600 font-medium">
            모두다 맘껏 10GB+(밀리의 서재 FREE)
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 bg-white border-2 border-[#E60012] rounded-full flex items-center justify-center hover:bg-red-50 transition"
          >
            <span className="text-[#E60012] text-xl">∧</span>
          </button>
          <div className="text-right">
            <div className="flex items-baseline gap-2 mb-1 justify-end">
              <span className="text-[13px] text-black">월 납부금액</span>
              <span className="text-[28px] font-extrabold text-[#E60012]">19,000</span>
              <span className="text-[16px] text-[#E60012] font-bold">원</span>
            </div>
            <p className="text-[11px] text-gray-500">가입비 및 유심비 등 기타요금은 별도 청구됩니다</p>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      {showHelp && (
        <div className="fixed right-8 bottom-28 z-50">
          <div className="relative">
            <button onClick={() => setShowHelp(false)} className="absolute -top-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-xs z-10 hover:bg-gray-800">✕</button>
            <div className="w-16 h-16 bg-[#00BFA5] rounded-full flex flex-col items-center justify-center shadow-lg cursor-pointer hover:bg-[#00A08A] transition-colors">
              <div className="text-2xl mb-1">👓</div>
              <span className="text-white text-[11px] font-bold">HELP</span>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed right-8 bottom-8 w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition z-50">
        <span className="text-gray-500 text-xl font-bold">↑</span>
      </button>

      {/* Modals */}
      {/* 1. Verification Process Modal */}
      {showProcessModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center animate-in fade-in duration-200 px-4">
          <div className="bg-white w-[420px] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100">
              <span className="font-bold text-[16px] text-black">
                {selectedMethod === '네이버 인증서' ? 'N 인증서' : '인증진행'}
              </span>
              <button onClick={() => setShowProcessModal(false)} className="text-gray-400 hover:text-black">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center">
              <div className="text-center mb-3">
                <h3 className="text-[22px] font-bold text-black leading-snug">iPhone 15에 보낸</h3>
                <h3 className="text-[22px] font-bold text-black leading-snug">알림을 눌러 인증을 진행하세요</h3>
              </div>
              <p className="text-[13px] text-gray-500 mb-6">인증 성공 시 이 화면은 자동으로 닫힙니다.</p>
              
              <div className="flex items-center gap-1.5 mb-8">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-blue-500 font-bold text-[16px]">{formatTime(timeLeft)}</span>
              </div>

              {/* Phone Illustration */}
              <div className="w-[180px] h-[340px] border-4 border-gray-800 rounded-[30px] relative flex justify-center pt-16 bg-gray-50 mb-8 overflow-hidden shadow-inner">
                {/* Notch */}
                <div className="absolute top-0 w-24 h-5 bg-gray-800 rounded-b-xl"></div>
                {/* Notification Pop */}
                <div className="w-[90%] bg-white rounded-xl shadow-lg p-3 flex gap-2 animate-in slide-in-from-top-4 duration-500">
                  <div className="w-6 h-6 bg-[#03C75A] rounded flex items-center justify-center flex-shrink-0 text-white font-bold text-[11px]">N</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[10px] font-bold">네이버인증서</span>
                      <span className="text-[9px] text-gray-400">NOW</span>
                    </div>
                    <p className="text-[10px] text-gray-600 leading-tight">알림을 눌러 인증을 진행해 주세요</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 w-full mb-6">
                <button className="flex-1 h-[50px] bg-[#E8F0FE] text-blue-600 font-bold rounded-lg text-[14px]">🔔 알림 다시 받기</button>
                <button className="flex-1 h-[50px] bg-[#E8F0FE] text-blue-600 font-bold rounded-lg text-[14px]">📱 앱 다운로드</button>
              </div>

              <div className="w-full border rounded-lg px-4 py-3 flex justify-between items-center text-gray-600 cursor-pointer hover:bg-gray-50">
                <span className="text-[14px] font-medium">도움말</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Verification Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[320px] rounded-xl overflow-hidden shadow-2xl flex flex-col text-center">
            <div className="p-8">
              <p className="text-[16px] font-bold text-black mt-2">본인 인증을 완료 하였습니다.</p>
            </div>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                setIsVerified(true);
              }} 
              className="w-full h-[55px] bg-black text-white font-bold text-[16px] hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 3. SIM Validation Loading Overlay */}
      {isSimValidating && (
        <div className="fixed inset-0 z-[120] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="w-[60px] h-[60px] border-4 border-white/20 border-t-[#00BFA5] rounded-full animate-spin"></div>
        </div>
      )}

      {/* 4. SIM Validation Result Modal */}
      {showSimResultModal && (
        <div className="fixed inset-0 z-[130] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[360px] rounded-lg overflow-hidden shadow-2xl flex flex-col text-center px-7 py-8">
            <p className="text-[15px] text-black mb-8">입력하신 유심번호 사용 가능합니다.</p>
            <button 
              onClick={() => {
                setShowSimResultModal(false);
                setSimValidated(true);
              }} 
              className="w-full h-[50px] rounded-[6px] bg-black text-white font-bold text-[15px] hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 5. Face Auth URL Sent Modal */}
      {showFaceUrlModal && (
        <div className="fixed inset-0 z-[140] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[360px] rounded-lg overflow-hidden shadow-2xl flex flex-col text-center px-7 py-8">
            <p className="text-[15px] text-gray-700 mb-8">안면인증 URL이 전송되었습니다.</p>
            <button 
              onClick={() => {
                setShowFaceUrlModal(false);
                setFaceUrlSent(true);
              }} 
              className="w-full h-[50px] rounded-[6px] bg-black text-white font-bold text-[15px] hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 6. Face Auth Result Modal (Failure) */}
      {showFaceResultModal && (
        <div className="fixed inset-0 z-[150] bg-black/60 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[340px] rounded-lg overflow-hidden shadow-2xl flex flex-col text-center px-7 py-8">
            <div className="space-y-1 mb-8">
              <p className="text-[15px] text-gray-700">안면인증 실패 하였습니다.</p>
              <p className="text-[15px] text-gray-700">향후 추가 인증이 필요할 수 있습니다.</p>
              <p className="text-[15px] text-gray-700">(개통은 계속 진행 됩니다.)</p>
            </div>
            <button 
              onClick={() => {
                setShowFaceResultModal(false);
                setFaceResultChecked(true);
              }} 
              className="w-full h-[50px] rounded-[6px] bg-black text-white font-bold text-[15px] hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 7. 사전동의 방법 Modal */}
      {showConsentMethodModal && (
        <div className="fixed inset-0 z-[160] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[700px] rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col px-10 py-8 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[22px] font-bold text-black">번호이동 사전동의 안내</h2>
              <button onClick={() => setShowConsentMethodModal(false)} className="text-black hover:bg-gray-100 p-2 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-8">
              <p className="text-[16px] font-bold text-black mb-1">번호이동을 위해서는 현재 사용 중인 통신사의 인증 절차가 필요합니다.</p>
              <p className="text-[13px] text-gray-500">사전 동의 요청 시 문자가 발송되며, 문자가 오지 않을 경우 통신사 ARS로 전화하셔서 동의를 진행해 주시기 바랍니다.</p>
            </div>

            <div className="flex border-b border-gray-200 mb-8">
              <button 
                className={`flex-1 pb-3 text-[16px] text-center relative transition-colors ${consentMethodTab === 'sms' ? 'font-bold text-black' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setConsentMethodTab('sms')}
              >
                문자인증
                {consentMethodTab === 'sms' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>}
              </button>
              <button 
                className={`flex-1 pb-3 text-[16px] text-center relative transition-colors ${consentMethodTab === 'ars' ? 'font-bold text-black' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setConsentMethodTab('ars')}
              >
                ARS인증
                {consentMethodTab === 'ars' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black"></div>}
              </button>
            </div>

            {consentMethodTab === 'sms' && (
              <div className="flex flex-col gap-6 relative">
                <div className="absolute left-[23px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#00BFA5] -z-10"></div>
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#00BFA5] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                    <span className="text-white text-[20px]">👆</span>
                  </div>
                  <div className="bg-[#F5F5F5] rounded-full px-6 py-3 text-black text-[15px]">
                    <span className="font-bold mr-2">STEP1</span> | '사전동의 요청' 버튼 클릭
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#00BFA5] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                    <span className="text-white text-[14px] font-bold">URL</span>
                  </div>
                  <div className="bg-[#F5F5F5] rounded-full px-6 py-3 text-black text-[15px]">
                    <span className="font-bold mr-2">STEP2</span> | 수신한 문자 내 URL에 접속하여 동의
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#00BFA5] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <div className="bg-[#F5F5F5] rounded-full px-6 py-3 text-black text-[15px]">
                    <span className="font-bold mr-2">STEP3</span> | '동의완료' 버튼을 눌러 다음 단계 이동
                  </div>
                </div>
              </div>
            )}

            {consentMethodTab === 'ars' && (
              <div>
                <div className="flex flex-col gap-6 relative mb-8">
                  <div className="absolute left-[23px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-[#00BFA5] -z-10"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-[48px] h-[48px] rounded-full bg-[#00BFA5] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                      <span className="text-white text-[20px]">👆</span>
                    </div>
                    <div className="bg-[#F5F5F5] rounded-full px-6 py-3 text-black text-[15px]">
                      <span className="font-bold mr-2">STEP1</span> | '사전동의 요청' 버튼 클릭
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[48px] h-[48px] rounded-full bg-[#00BFA5] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                      <span className="text-white text-[14px] font-bold">ARS</span>
                    </div>
                    <div className="bg-[#F5F5F5] rounded-full px-6 py-3 text-black text-[15px]">
                      <span className="font-bold mr-2">STEP2</span> | 이전 통신사 ARS에 전화걸어 동의 진행
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[48px] h-[48px] rounded-full bg-[#00BFA5] flex items-center justify-center flex-shrink-0 z-10 shadow-sm">
                      <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                    <div className="bg-[#F5F5F5] rounded-full px-6 py-3 text-black text-[15px]">
                      <span className="font-bold mr-2">STEP3</span> | '동의완료' 버튼을 눌러 다음 단계 이동
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[16px] font-bold text-black mb-3">통신사별 ARS번호</h3>
                  <div className="border-t-2 border-black w-full">
                    <div className="flex bg-[#F5F5F5] py-3 text-[14px] font-bold text-black text-center border-b border-gray-300">
                      <div className="w-1/2 border-r border-gray-300">통신사</div>
                      <div className="w-1/2">ARS번호</div>
                    </div>
                    {[
                      { name: 'KT/KT 알뜰폰(MVNO)', num: '1588-2935' },
                      { name: 'SKT', num: '1566-1509' },
                      { name: 'SKT 알뜰폰(MVNO)', num: '1599-0133' },
                      { name: 'LGU+/LGU+ 알뜰폰(MVNO)', num: '1544-3553' },
                      { name: 'CJ헬로모바일', num: '070-7336-7766' },
                      { name: '세종텔레콤(스노우맨)', num: '1688-9345' },
                      { name: '한국케이블텔레콤_KCT', num: '1877-9120' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex py-3 text-[14px] text-black text-center border-b border-gray-200">
                        <div className="w-1/2 border-r border-gray-200 flex items-center justify-center">{item.name}</div>
                        <div className="w-1/2 flex items-center justify-center">{item.num}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. 사전동의 요청 알림 Modal */}
      {showConsentRequestModal && (
        <div className="fixed inset-0 z-[170] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[360px] rounded-[12px] shadow-2xl flex flex-col items-center px-8 py-9">
            <div className="w-[60px] h-[60px] rounded-full bg-[#00BFA5] flex items-center justify-center mb-6">
              <span className="text-white text-[28px] font-bold">!</span>
            </div>
            
            <div className="text-center text-gray-600 text-[15px] mb-8 leading-relaxed">
              <p>받으신 문자 내 URL 동의 또는</p>
              <p>확인버튼 클릭 후 안내되는 번호로 전화를 걸어</p>
              <br />
              <p>번호이동 확인(동의)를 진행 해 주세요.</p>
            </div>
            
            <button 
              onClick={() => {
                setShowConsentRequestModal(false);
                setIsConsentRequested(true);
              }} 
              className="w-full h-[50px] rounded-[8px] bg-black text-white font-bold text-[16px] hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 9. 결합 동의 모달 */}
      {showSoloModal && (
        <div className="fixed inset-0 z-[180] bg-black/60 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[760px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-[22px] font-bold text-black">결합을 위한 필수 확인사항 동의</h2>
              <button onClick={() => setShowSoloModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            <div className="px-6 py-8 overflow-y-auto">
              <ul className="space-y-3 text-[15px] text-gray-600">
                <li className="flex gap-2">
                  <span className="mt-1">•</span>
                  <span>아무나 결합 또는 아무나 가족 결합+ 상품 가입으로 무료 결합 데이터 제공을 받고 계실 경우 데이터 결합 혜택은 중복 제공되지 않습니다.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1">•</span>
                  <span>요금제 변경 이후의 요금제에 따라 결합 데이터 제공량이 달라지거나, 결합이 해지 될 수 있습니다.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1">•</span>
                  <span>결합 해지는 고객센터(114)를 통해 가능합니다.</span>
                </li>
              </ul>
            </div>
            <div className="px-6 pb-6 pt-4">
              <button 
                onClick={() => {
                  setIsSoloCombineAgreed(true);
                  setShowSoloModal(false);
                }} 
                className="w-full h-[55px] bg-black text-white rounded-xl text-[16px] font-bold hover:bg-gray-800 transition-colors"
              >
                동의 후 닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 10. 기타 부가서비스 선택 모달 */}
      {showAddonModal && (
        <div className="fixed inset-0 z-[190] bg-black/60 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[440px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-black">부가서비스 선택</h2>
              <button onClick={() => setShowAddonModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
              {/* 무료 부가서비스 */}
              <div>
                <h3 className="text-[16px] font-bold text-black mb-4">무료 부가서비스</h3>
                <div className="flex flex-col border-t border-gray-200">
                  {['무선인터넷차단', '국제전화발신제한', '익명호수신거부', '060발신차단서비스', '네트워크유해차단', '링투유알리미'].map(addon => (
                    <div key={addon} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedAddons(prev => prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon])}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedAddons.includes(addon) ? 'bg-[#00BFA5] border-[#00BFA5]' : 'bg-white border-gray-300'}`}
                        >
                          {selectedAddons.includes(addon) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </button>
                        <span className="text-[15px] text-black">{addon}</span>
                      </div>
                      <button className="p-1"><ChevronDown className="w-5 h-5 text-gray-400" /></button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* 유료 부가서비스 */}
              <div>
                <h3 className="text-[16px] font-bold text-black mb-4">유료 부가서비스</h3>
                <div className="flex flex-col border-t border-gray-200">
                  {[
                    { name: '링투유', price: 990 },
                    { name: '캐치콜', price: 550 },
                    { name: '착신전환', price: 1650 },
                    { name: '링투유오토체인지(월)', price: 660 },
                    { name: '착신전환통화', price: 770 },
                    { name: '자동연결', price: 770 },
                    { name: '오토링', price: 1650 },
                    { name: '통화가능알리미', price: 550 },
                  ].map(addon => (
                    <div key={addon.name} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            const newAddons = selectedAddons.includes(addon.name) ? selectedAddons.filter(a => a !== addon.name) : [...selectedAddons, addon.name];
                            setSelectedAddons(newAddons);
                            setAddonSum(prev => selectedAddons.includes(addon.name) ? prev - addon.price : prev + addon.price);
                          }}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedAddons.includes(addon.name) ? 'bg-[#00BFA5] border-[#00BFA5]' : 'bg-white border-gray-300'}`}
                        >
                          {selectedAddons.includes(addon.name) && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                        </button>
                        <span className="text-[15px] text-black">{addon.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[15px] text-gray-600">{addon.price.toLocaleString()}원</span>
                        <button className="p-1"><ChevronDown className="w-5 h-5 text-gray-400" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4 flex gap-2 border-t border-gray-100">
              <button 
                onClick={() => setShowAddonModal(false)} 
                className="w-1/2 h-[50px] bg-[#F5F5F5] text-black rounded-lg text-[15px] font-bold hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={() => setShowAddonModal(false)} 
                className="w-1/2 h-[50px] bg-black text-white rounded-lg text-[15px] font-bold hover:bg-gray-800 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. 휴대폰안심보험 선택 모달 */}
      {showInsuranceModal && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[1000px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-black">휴대폰안심보험 신청/변경</h2>
              <button onClick={() => setShowInsuranceModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {/* 미가입 */}
              <div className="mb-6">
                <button 
                  onClick={() => setInsurance('미가입')}
                  className={`w-[320px] h-[60px] bg-white rounded-lg border flex items-center px-5 transition-colors relative ${insurance === '미가입' ? 'border-black' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <span className={`text-[16px] font-bold ${insurance === '미가입' ? 'text-black' : 'text-gray-500'}`}>미가입</span>
                  {insurance === '미가입' && <Check className="w-5 h-5 absolute right-5 stroke-[3] text-black" />}
                </button>
              </div>
              
              {/* 보험 그리드 */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: '폴드 180', type: '단말결합 안드로이드형', price: 9200, desc: 'M모바일 신품 단말기 또는, 자급제 단말기(안드로이드형)와 USIM을 결합 개통 시 가입 가능한 상품입니다.', limit: '갤럭시 폴드 전용', cover: '최대 180만원 보장', pills: ['분실', '도난', '파손', '화재', '침수'] },
                  { name: '분실파손 150', type: '단말결합 안드로이드형', price: 6800, desc: 'M모바일 신품 단말기 또는, 자급제 단말기(안드로이드형)와 USIM을 결합 개통 시 가입 가능한 상품입니다.', limit: '100만원 이상', cover: '최대 150만원 보장', pills: ['분실', '도난', '파손', '화재', '침수'] },
                  { name: 'i-분실파손 150', type: '단말결합 아이폰형', price: 7200, desc: 'M모바일 신품 단말기 또는, 자급제 단말기(아이폰형)와 USIM을 결합 개통 시 가입 가능한 상품입니다.', limit: '100만원 이상', cover: '최대 150만원 보장', pills: ['분실', '도난', '파손', '화재', '침수'] },
                  { name: '분실파손 100', type: '단말결합 안드로이드형', price: 5400, desc: 'M모바일 신품 단말기 또는, 자급제 단말기(안드로이드형)와 USIM을 결합 개통 시 가입 가능한 상품입니다.', limit: '제한없음', cover: '최대 100만원 보장', pills: ['분실', '도난', '파손', '화재', '침수'] },
                  { name: '중고파손 100', type: '유심결합', price: 3400, desc: '유심 개통 후 사용 중인 중고 단말기로 가입 가능한 상품입니다.', limit: '제한없음', cover: '최대 100만원 보장', pills: ['파손', '화재', '침수'] },
                  { name: 'i-분실파손 90', type: '단말결합 아이폰형', price: 4600, desc: 'M모바일 신품 단말기 또는, 자급제 단말기(아이폰형)와 USIM을 결합 개통 시 가입 가능한 상품입니다.', limit: '제한없음', cover: '최대 90만원 보장', pills: ['분실', '도난', '파손', '화재', '침수'] },
                ].map(item => (
                  <div 
                    key={item.name}
                    onClick={() => setInsurance(item.name)}
                    className={`bg-white rounded-xl border p-5 flex flex-col cursor-pointer transition-colors relative ${insurance === item.name ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="font-bold text-[18px] text-black">{item.name}</div>
                      <div className={`w-5 h-5 rounded flex items-center justify-center border ${insurance === item.name ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                        {insurance === item.name && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                      </div>
                    </div>
                    <div className="text-[13px] text-gray-500 mb-4">{item.type}</div>
                    <div className="flex items-center gap-2 mb-4">
                      {item.type.includes('아이폰') ? (
                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[16px] font-bold"></div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#00BFA5] text-white flex items-center justify-center text-[15px] font-bold">A</div>
                      )}
                      <div className="font-bold text-[17px] text-black">월 이용료 {item.price.toLocaleString()}원</div>
                    </div>
                    <div className="space-y-2 mb-5 flex-1 pt-4 border-t border-gray-100">
                      <div className="flex gap-3 text-[13px]">
                        <span className="text-gray-500 w-14 flex-shrink-0">설명</span>
                        <span className="text-gray-700 leading-snug">{item.desc}</span>
                      </div>
                      <div className="flex gap-3 text-[13px]">
                        <span className="text-gray-500 w-14 flex-shrink-0">가입가능</span>
                        <span className="text-gray-700 font-medium">{item.limit}</span>
                      </div>
                      <div className="flex gap-3 text-[13px]">
                        <span className="text-gray-500 w-14 flex-shrink-0">보상범위</span>
                        <span className="text-gray-700 font-medium">{item.cover}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                      {item.pills.map(pill => (
                        <span key={pill} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[12px] font-bold">{pill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 pb-6 pt-4 flex gap-3 border-t border-gray-200">
              <button 
                onClick={() => setShowInsuranceModal(false)} 
                className="w-1/2 h-[55px] bg-[#F5F5F5] text-black rounded-xl text-[16px] font-bold hover:bg-gray-200 transition-colors"
              >
                취소
              </button>
              <button 
                onClick={() => setShowInsuranceModal(false)} 
                className="w-1/2 h-[55px] bg-black text-white rounded-xl text-[16px] font-bold hover:bg-gray-800 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. 주소검색 모달 */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[440px] rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col px-7 py-7 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[18px] font-bold text-black">주소검색</h2>
              <button onClick={() => setShowAddressModal(false)} className="text-black hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative mb-6">
              <div className={`w-full h-[50px] rounded-[30px] bg-white border flex items-center px-4 transition-colors ${addressSearchFocus ? 'border-blue-500 border-dashed' : 'border-gray-300'}`}>
                <input 
                  type="text" 
                  placeholder="도로명주소, 건물명 또는 지번입력"
                  value={addressSearchTerm}
                  onChange={e => setAddressSearchTerm(e.target.value)}
                  onFocus={() => setAddressSearchFocus(true)}
                  onBlur={() => setTimeout(() => setAddressSearchFocus(false), 200)}
                  className="flex-1 bg-transparent outline-none text-[15px] text-black placeholder-gray-400"
                />
                {addressSearchTerm && (
                  <button onClick={() => setAddressSearchTerm('')} className="mr-2">
                    <X className="w-4 h-4 text-gray-400 hover:text-black" />
                  </button>
                )}
                {!addressSearchTerm ? (
                  <button className="w-[36px] h-[36px] bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 text-white" />
                  </button>
                ) : (
                  <button 
                    onClick={() => setAddressSearchStep('result')}
                    className="h-[40px] px-4 bg-black rounded-lg text-white font-bold text-[14px]"
                  >
                    검색
                  </button>
                )}
              </div>
              
              {/* Auto-complete Dropdown */}
              {addressSearchFocus && addressSearchTerm.length > 0 && addressSearchStep === 'init' && (
                <div className="absolute top-[55px] right-0 w-[95%] bg-white border border-gray-200 rounded-[8px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] z-10 py-2 animate-in fade-in">
                  <div className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3" onClick={() => { setAddressSearchTerm('성균관로 17길 45'); }}>
                    <div className="w-7 h-7 rounded-full bg-[#00BFA5]/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[#00BFA5]" />
                    </div>
                    <span className="font-bold text-[14px] text-black">성균관로 17길 45</span>
                  </div>
                  <div className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3" onClick={() => { setAddressSearchTerm('주소 관리...'); }}>
                    <div className="w-7 h-7 rounded-full bg-[#00BFA5]/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[#00BFA5]" />
                    </div>
                    <span className="text-[14px] text-black">주소 관리...</span>
                  </div>
                </div>
              )}
            </div>

            {addressSearchStep === 'init' && (
              <div>
                <h3 className="font-bold text-[13px] text-black mb-3">검색어 예시</h3>
                <div className="flex flex-col gap-3 mb-4">
                  {[1,2,3].map(i => (
                    <div key={i}>
                      <div className="text-[14px] text-black font-bold">도로명 + 건물번호 입력</div>
                      <div className="text-[13px] text-[#00BFA5] mt-0.5">예) 반포대로 58</div>
                    </div>
                  ))}
                </div>
                <div className="h-[1px] bg-gray-200 w-full mb-5"></div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-[18px] h-[18px] bg-[#E60012] rounded-full flex items-center justify-center text-white text-[12px] font-bold">!</div>
                  <span className="font-bold text-black text-[14px]">알려드립니다</span>
                </div>
                <div className="text-[13px] text-gray-500 flex flex-col gap-1">
                  <p className="flex gap-1"><span className="text-[10px] mt-0.5">•</span><span>건물명은 각 자치단체에서 등록한 경우 조회가 가능합니다.</span></p>
                  <p className="flex gap-1"><span className="text-[10px] mt-0.5">•</span><span>화면 상단의 상세검색을 이용하시면 보다 정확한 결과를 얻으실 수 있습니다.</span></p>
                </div>
              </div>
            )}

            {(addressSearchStep === 'result' || addressSearchStep === 'detail') && (
              <div className="animate-in fade-in">
                <div className="flex items-center gap-1 mb-3">
                  <span className="font-bold text-[15px] text-black">도로명주소 검색 결과</span>
                  <span className="font-bold text-[15px] text-[#00BFA5]">(1건)</span>
                </div>
                
                <div 
                  className={`bg-white border rounded-lg p-5 cursor-pointer transition-colors mb-4 ${addressSearchStep === 'detail' ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => setAddressSearchStep('detail')}
                >
                  <div className="font-bold text-[16px] text-black mb-3">08823</div>
                  <div className="flex items-start gap-2 mb-1.5">
                    <div className="bg-[#00BFA5] text-white text-[11px] px-2 py-0.5 rounded-[12px] whitespace-nowrap flex-shrink-0 mt-0.5 font-medium">도로명</div>
                    <div className="text-[14px] text-black">서울특별시 성균관로 17길 45</div>
                  </div>
                  <div className="flex items-start gap-2 mb-3">
                    <div className="bg-gray-400 text-white text-[11px] px-2.5 py-0.5 rounded-[12px] whitespace-nowrap flex-shrink-0 mt-0.5 font-medium">지번</div>
                    <div className="text-[13px] text-gray-500">서울특별시 성균관로 17길 45</div>
                  </div>
                  <div className="h-[1px] bg-gray-200 w-full mt-2"></div>
                </div>
                
                {addressSearchStep === 'detail' && (
                  <div className="animate-in fade-in slide-in-from-top-2">
                    <div className={`w-full h-[55px] border rounded-lg bg-white mb-3 transition-colors relative ${modalDetailFocus ? 'border-blue-500 border-dashed' : 'border-gray-300'}`}>
                      <input 
                        type="text" 
                        value={modalDetailAddress}
                        onChange={e => setModalDetailAddress(e.target.value)}
                        onFocus={() => setModalDetailFocus(true)}
                        onBlur={() => setModalDetailFocus(false)}
                        className={`peer w-full h-full pt-4 px-4 pb-1 bg-transparent outline-none text-[15px] text-black`}
                      />
                      <label className={`absolute left-4 transition-all duration-200 pointer-events-none peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-gray-500 ${modalDetailAddress ? 'top-1.5 text-[11px] text-gray-500' : 'top-3.5 text-[15px] text-gray-400'}`}>
                        상세주소 (예 1202동 101호 / 종로빌딩 1층)
                      </label>
                    </div>
                    <button 
                      onClick={() => {
                        if (!modalDetailAddress.trim()) {
                          setShowAddressAlert(true);
                          return;
                        }
                        if (addressTarget === 'home') {
                          setZipcode('08823');
                          setAddress('서울특별시 성균관로 17길 45');
                          setDetailAddress(modalDetailAddress);
                        } else {
                          setShippingAddress({
                            zonecode: '08823',
                            address: '서울특별시 성균관로 17길 45',
                            detailAddress: modalDetailAddress
                          });
                          setIsShippingAddressModified(true);
                        }
                        setShowAddressModal(false);
                      }}
                      className={`w-full h-[55px] rounded-lg font-bold text-[16px] transition-colors ${
                        modalDetailAddress.trim() ? 'bg-black text-white hover:bg-gray-800' : 'bg-[#E5E5E5] text-gray-500'
                      }`}
                    >
                      주소입력
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10. 주소검색 알림 모달 (상세주소 미입력) */}
      {showAddressAlert && (
        <div className="fixed inset-0 z-[210] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[280px] rounded-[12px] shadow-xl flex flex-col p-6 items-center">
            <div className="text-center text-black text-[15px] font-medium mb-6 mt-2">상세주소를 입력해 주세요.</div>
            <button 
              onClick={() => setShowAddressAlert(false)}
              className="w-full h-[45px] bg-black text-white font-bold rounded-lg text-[15px] hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 13. Step 5 유효성 검증 성공 모달 (작은 모달) */}
      {showValidationModal && (
        <div className="fixed inset-0 z-[220] bg-black/50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[360px] rounded-[4px] shadow-lg flex flex-col items-center px-6 py-8">
            <p className="text-[16px] text-black text-center mb-6">
              {payMethod === '자동이체' ? '계좌번호 유효성 검증에 성공하였습니다.' : '신용카드번호 유효성 검증에 성공하였습니다.'}
            </p>
            <button 
              onClick={() => {
                setShowValidationModal(false);
                setIsPaymentValidated(true);
              }}
              className="w-[200px] h-[48px] bg-black text-white font-bold text-[16px] rounded-[4px] hover:bg-gray-800 transition-colors"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {/* 14. Step 5 개통 후 주의사항 안내 모달 (큰 모달) */}
      {showOrderModal && (
        <div className="fixed inset-0 z-[230] bg-black/50 flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white w-[720px] rounded-[4px] shadow-lg flex flex-col px-10 py-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold text-black">개통 후 주의사항 안내</h2>
              <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="text-[16px] text-black leading-[1.7] space-y-4 mb-8">
              <p>KAIT(한국정보통신진흥협회) 명의도용 방지 정책에 따라 하나의 휴대폰으로는 여러명의 휴대폰을 사용할 수 없습니다.</p>
              <p>개통 후 사용하시려는 휴대폰에 USIM 또는 eSIM을 인식 하실 경우 해당 휴대폰 사용자 인증을 요청하는 안내문자가 발송될 수 있으며, 그러한 경우 해당 인증 URL을 통한 본인인증이 필요하오니 꼭 인증 부탁드립니다.</p>
              <p className="font-medium text-gray-800">※ 정상적으로 인증되지 않을 경우 관련 약관에 의거하여 2일 이내 자동 이용정지 및 향후 직권 해지처리 될 수 있습니다.</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${orderModalAgreed ? 'bg-[#14B8A6] border-[#14B8A6]' : 'bg-white border-gray-300 group-hover:border-gray-400'}`}>
                  {orderModalAgreed && <Check className="w-3 h-3 text-white stroke-[3]" />}
                </div>
                <span className={`text-[16px] transition-colors ${orderModalAgreed ? 'text-black' : 'text-gray-400'}`}>
                  위 사항을 읽고, 이해하였습니다.
                </span>
                <input 
                  type="checkbox" 
                  checked={orderModalAgreed} 
                  onChange={() => setOrderModalAgreed(!orderModalAgreed)} 
                  className="hidden" 
                />
              </label>

              <button 
                disabled={!orderModalAgreed}
                onClick={() => {
                  setShowOrderModal(false);
                  setIsCompletingOrder(true);
                  setTimeout(() => {
                    setIsCompletingOrder(false);
                    goToStep(6);
                  }, 500);
                }}
                className={`w-[200px] h-[56px] rounded-[4px] text-[16px] font-bold transition-all duration-200 ${orderModalAgreed ? 'bg-black text-white hover:bg-gray-800' : 'bg-[#E5E5E5] text-gray-500 cursor-not-allowed'}`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 15. 주문완료 로딩 스피너 */}
      {isCompletingOrder && (
        <div className="fixed inset-0 z-[240] bg-black/40 flex items-center justify-center animate-in fade-in duration-200">
          <div className="w-[60px] h-[60px] border-4 border-white/20 border-t-[#34D4B7] rounded-full animate-spin"></div>
        </div>
      )}

    </div>
  );
}