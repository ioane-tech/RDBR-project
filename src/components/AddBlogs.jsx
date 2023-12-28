import React, { useContext, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { MdError } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { token } from '../Token';

import LoginContext from './context/LoginContext' 
function AddBlogs() {

  const { 
    logedIn, 
    setLogedIn,
  } = useContext(LoginContext);

  useEffect(() => {
    const storedAuthorized = localStorage.getItem('authorized');
    if (storedAuthorized === 'true') {
      setLogedIn(true);
    }
  }, []);



/**values from local storage */
  const savedData = JSON.parse(localStorage.getItem('formData')) || {
    selectedFile: null,
    selectedCategories: [],
    author: '',
    header: '',
    description: '',
    email: '',
    blogDate: null,
  };


/************set errors if local storage values cant or can get through validations*/
  useEffect(() => {
    if (savedData.author) {
      authorWrightHandler({ target: { value: savedData.author } });
    }

    if (savedData.header) {
      headerInputHandler({ target: { value: savedData.header } });
    }

    if (savedData.description) {
      descriptionHandler({ target: { value: savedData.description } });
    }

    if (savedData.email) {
      emailHandler({ target: { value: savedData.email } });
    }
  }, []);




  const [categoriesData,setCategoriesData]=useState()
  const [allErrorChecker,setAllErrorCecker]=useState(false)
  const [SuccessPostPopup,setSuccessPopup]=useState(false)

/*image state**/
  const fileInputRef = useRef(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(savedData.selectedFile);

  const [imageError,setImageError]=useState(false)
/****categories state */
  const [selectedCategories, setSelectedCategories] = useState(savedData.selectedCategories);

/**date state */
  const [blogDate, setBlogDate] = useState(null);

/*****author input states */
  const [author, setAuthor] = useState(savedData.author);

  const [authorfourSybolError,setAuthorFourSymbolError]=useState()
  const [authorTwoWordsError,setAuthorTwoWordsError]=useState()
  const [authorGeorgiaSymbolsError,setAuthorGeorgianSymbolError]=useState()

  const [inputErrorColor,setInputErrorColor]=useState()

{/*****header input states */}
  const [header, setHeader] = useState(savedData.header);

  const [headerTwoSybolError,setheaderTwoSymbolError]=useState()

{/*****description input states */}
  const [description, setDescription] = useState(savedData.description);
  const [description4SybolError,setdescription4SymbolError]=useState()

{/*****email input states */}
  const [email, setEmail] = useState(savedData.email);
  const [emailError,setEmailError]=useState()


/*****set values in local storage */
useEffect(() => {
  const formData = {
    selectedFile,
    selectedCategories,
    author,
    header,
    description,
    email,
    blogDate,
  };

  localStorage.setItem('formData', JSON.stringify(formData));
}, [selectedFile, selectedCategories, author, header, description, email,blogDate]);

useEffect(() => {
  const savedDate = savedData.blogDate;
  if (savedDate) {
    setBlogDate(new Date(savedDate));
  }

}, [savedData.blogDate]);




/******************************************************image local storage handling */
useEffect(() => {
  const savedSelectedFile = localStorage.getItem('selectedFile');
  const savedFileName = localStorage.getItem('selectedFileName');
  if (savedSelectedFile && savedFileName) {
    const blob = dataURItoBlob(savedSelectedFile);
    setSelectedFile(blob);
    setSelectedFileName(savedFileName);
  }
}, []);

// Convert data URI to Blob
const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

// Save selectedFile and its name to localStorage when they change
useEffect(() => {
  if (selectedFile && selectedFileName) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      localStorage.setItem('selectedFile', base64data);
      localStorage.setItem('selectedFileName', selectedFileName);
    };

    if (selectedFile instanceof Blob) {
      reader.readAsDataURL(selectedFile);
    }
  } else {
    localStorage.removeItem('selectedFile');
    localStorage.removeItem('selectedFileName');
  }
}, [selectedFile, selectedFileName]);




{/**************************************** handlers *************************** */}
{/***file upload handler */}
const handleFileChange = (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);
  setSelectedFileName(file.name); 
};
  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
    setImageError(false)
  };
  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click();
  };

{/******author handler */}
  const authorWrightHandler=(e)=>{
    const inputValue = e.target.value;
    const georgianLetters = /^[ ა-ჰ]+$/;
    
    const wordsArray = inputValue.split(/\s+/).filter((word) => word.length > 0);
    
    const inputValueWithoutSpaces = inputValue.replace(/\s+/g, ''); 
    const hasEnoughSymbols = inputValueWithoutSpaces.length >= 4;

    const hasEnoughWords = wordsArray.length >= 2;
    const containsOnlyGeorgianLetters = georgianLetters.test(inputValue);
  
    if (hasEnoughSymbols) {
      setAuthorFourSymbolError(false);
    } else {
      setAuthorFourSymbolError(true);
    }
  
    if (hasEnoughWords) {
      setAuthorTwoWordsError(false);
    } else {
      setAuthorTwoWordsError(true);
    }
  
    if (containsOnlyGeorgianLetters) {
      setAuthorGeorgianSymbolError(false);
    } else {
      setAuthorGeorgianSymbolError(true);
    }
  
    if (inputValue === "") {
      setAuthorGeorgianSymbolError(null);
      setAuthorTwoWordsError(null);
      setAuthorFourSymbolError(null);

      setInputErrorColor(null);
    } else if (!hasEnoughSymbols || !hasEnoughWords || !containsOnlyGeorgianLetters) {
      setInputErrorColor(true);
    } else {
      setInputErrorColor(false);
    }
  
    setAuthor(inputValue);
  };


{/******header handler  */} 
  const headerInputHandler=(e)=>{
    const inputValue = e.target.value;

    const inputValueWithoutSpaces = inputValue.replace(/\s+/g, ''); 
    const hasEnoughSymbols = inputValueWithoutSpaces.length >= 2;

    if (hasEnoughSymbols) {
      setheaderTwoSymbolError(false);
    } else {
      setheaderTwoSymbolError(true);
    }
    if (inputValue === "") {
      setheaderTwoSymbolError(null)
    }
    setHeader(inputValue)
  } 

{/******description handler */} 
  const descriptionHandler=(e)=>{
    const inputValue=e.target.value

    const inputValueWithoutSpaces = inputValue.replace(/\s+/g, ''); 
    const hasEnoughSymbols = inputValueWithoutSpaces.length >= 4;
    
    if (hasEnoughSymbols) {
      setdescription4SymbolError(false);
    } else {
      setdescription4SymbolError(true);
    }
    if (inputValue === "") {
      setdescription4SymbolError(null)
    }

    setDescription(inputValue)
  }

{/******email handler */} 
  const emailHandler=(e)=>{
    const inputValue=e.target.value

    if (inputValue.endsWith('@redberry.ge') || inputValue==="") {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
    if (inputValue === "") {
      setEmailError(null)
    }

    setEmail(inputValue)
  }

{/*****all error checker */}
  useEffect(()=>{
    if(authorfourSybolError|| 
      authorTwoWordsError|| 
      authorGeorgiaSymbolsError||
      headerTwoSybolError|| 
      description4SybolError|| 
      emailError|| 
      authorfourSybolError==null|| 
      authorTwoWordsError==null|| 
      authorGeorgiaSymbolsError==null|| 
      headerTwoSybolError==null|| 
      description4SybolError==null|| 
      selectedFile==null||
      selectedCategories.length === 0
      ){
        setAllErrorCecker(true)
      }else{
        setAllErrorCecker(false)
      }
      console.log(selectedCategories)
  },[authorfourSybolError,authorTwoWordsError,authorGeorgiaSymbolsError,headerTwoSybolError,description4SybolError,emailError,selectedFile,selectedCategories])


  useEffect(() => {
    fetch('https://api.blog.redberryinternship.ge/api/categories')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('response status was not ok.');
      })
      .then(data => {
        setCategoriesData(data.data)
      })
      .catch(error => {
        console.error('There is a problem with data fetching:', error);
      });
  }, []);

{/***categories */}  
  const handleCategoryChange = (selectedOptions) => {
      setSelectedCategories(selectedOptions || []);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '12px',
      marginLeft: '-10px',
      height: '44px',
      overflowY: 'auto',
      backgroundColor: selectedCategories.length !== 0 ? 'rgba(248, 255, 248, 1)' : '',
      borderColor: selectedCategories.length !== 0 ? 'rgba(20, 216, 28, 1)' : '',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? state.data.background_color : 'transparent',
      color: state.isSelected ? state.data.text_color : '#333',
      borderRadius: '30px',
      padding: '8px 16px 8px 16px',
      margin: '8px 0',
      marginBottom:"5px",
      marginLeft:'5px',

      backgroundColor: state.data.background_color,
      color: state.data.text_color,
      cursor: 'pointer',
      ':hover': {
        opacity: '0.6',
      },
      display:'inline-block',
  
      width: 'auto', 
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.text_color,
    }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: state.data.background_color,
      borderRadius: '30px',
      padding: '2px 6px',
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: state.data.text_color,
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: state.data.text_color,
      backgroundColor: state.data.background_color,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      disabled: 'flex',
      flexDirection: 'row',
      borderRadius: '30px',
      backgroundColor: '#fff',
      padding: '8px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflowX: 'auto',
      maxWidth: '100%',
      
      display: 'flex',
      flexWrap: 'wrap', 
      justifyContent: 'flex-start', 
    }),
  };
  

 {/****date handler */} 
  const handleDateChange = (e) => {
    const inputValue = e.target.value;
    const selectedDate = new Date(inputValue); 
    setBlogDate(selectedDate);
  };


{/********submit */}
  const handlerSubmit = (e) => {
    e.preventDefault();

    const selectedCategoryIds = selectedCategories.map(category => category.id);
    const formattedDate = blogDate ? blogDate.toISOString().split('T')[0] : '';

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', header);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('publish_date', formattedDate);
    formData.append('categories', JSON.stringify(selectedCategoryIds));
    formData.append('email', email);

    fetch("https://api.blog.redberryinternship.ge/api/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, 
    })
    .then((response) => {
      if (response.status!==204) {
        throw new Error('Failed to upload the image or submit data.');
      }else{
        localStorage.removeItem('formData');
        localStorage.removeItem('selectedFile');
        localStorage.removeItem('selectedFileName');

        setSuccessPopup(true);
        setImageError(false);
      }

    })
    .catch((error) => {
      console.error('Error uploading image or submitting data:', error);
      setImageError(true);
    });

  };

  return (
    <>
    {logedIn===true?
    (
    <div>

      <div className='add_blog_container'>
        <p className='add_blogs_header'>ბლოგის დამატება</p>

        <form action="">

          <label className='add_blogs_label' htmlFor='photo'>ატვირთეთ ფოტო</label>
            {
              selectedFile===null?
              (
                <div className='upload_photo_div'>
                  <img src="/img/folderAdd.png" alt="" className='add_blogs_folder_addImg'/>
                  <p className='file_add_text'>
                    <span>ჩააგდეთ ფაილი აქ ან </span>
                    <span onClick={handleButtonClick}>აირჩიეთ ფაილი</span>
                  </p>
                  <input
                    type="file"
                    name='photo'
                    value={selectedFile}
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    required
                  />
                </div>
              )
              :
              (
                <div className='uploaded_file_div'>
                  <img src="/img/uploadedImg.png" alt="" />
                  <span>{selectedFileName}</span> 
                  <p onClick={removeFile}>&times;</p>
                </div>
              )
            }
            {
              imageError===true &&
              <p style={{marginLeft:"-20px"}} className='login_error'>
              <MdError className='error_icon'/>
              <span>ატვირთეთ სხვა ფოტო</span>
              </p>
            }

          <div className='form_container'>
            <div>
              {/*****author */}
              <label className='add_blogs_label' htmlFor='author'>ავტორი *</label>
                <input 
                  style={{
                    backgroundColor:inputErrorColor===true? "rgba(250, 242, 243, 1)" : inputErrorColor===false? "rgba(248, 255, 248, 1)" : "",
                    borderColor:inputErrorColor===true? "rgba(234, 25, 25, 1)" : inputErrorColor===false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>authorWrightHandler(e)}
                  className='common_input' 
                  type="text" 
                  name='author' 
                  value={author}
                  placeholder='შეიყვანეთ ავტორი' 
                  required  
                />
                <ul className='validation_list'>
                  <li 
                    style={{
                      color:authorfourSybolError===true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      authorfourSybolError===false? 
                      'rgba(20, 216, 28, 1)'
                      :
                      authorfourSybolError===null? 
                      "rgba(133, 133, 141, 1)"
                      :
                      ""
                    }}
                  >
                    მინიმუმ 4 სიმბოლო
                  </li>
                  <li 
                    style={{
                      color:authorTwoWordsError===true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      authorTwoWordsError===false? 
                      'rgba(20, 216, 28, 1)'
                      :
                      ""
                    }}
                  >
                    მინიმუმ 2 სიტყვა
                  </li>
                  <li 
                    style={{
                      color:authorGeorgiaSymbolsError===true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      authorGeorgiaSymbolsError===false? 
                      'rgba(20, 216, 28, 1)'
                      :
                      ""
                    }}
                  >
                    მხოლოდ ქართული სიმბოლოები
                  </li>
                </ul>
            </div>

            {/*****header */}
            <div>
              <label className='add_blogs_label' htmlFor='header'>სათაური *</label>
                <input 
                  style={{
                    backgroundColor:headerTwoSybolError===true? "rgba(250, 242, 243, 1)"  : headerTwoSybolError===false? "rgba(248, 255, 248, 1)" :"",
                    borderColor:headerTwoSybolError===true? "rgba(234, 25, 25, 1)" : headerTwoSybolError===false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>headerInputHandler(e)}
                  className='common_input' 
                  type="text" 
                  name='header' 
                  value={header}
                  placeholder='შეიყვანეთ სათაური' 
                  required 
                />
                <ul className='validation_list'>
                  <li
                    style={{
                      color:headerTwoSybolError===true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      headerTwoSybolError===false? 
                      'rgba(20, 216, 28, 1)'
                      :
                      ""
                    }}
                  >
                    მინიმუმ 2 სიმბოლო
                  </li>
                </ul>
            </div>  

            {/*****description */}
            <div>
              <label className='add_blogs_label' htmlFor='desctiption'>აღწერა *</label>
                <textarea 
                  style={{
                    backgroundColor:description4SybolError===true? "rgba(250, 242, 243, 1)"  : description4SybolError===false? "rgba(248, 255, 248, 1)" :"",
                    borderColor:description4SybolError===true? "rgba(234, 25, 25, 1)" : description4SybolError===false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>descriptionHandler(e)}
                  className='desctription_input' 
                  type="text" 
                  name='description' 
                  value={description}
                  placeholder='შეიყვანეთ სათაური' 
                  required 
                />
                <ul className='validation_list'>
                  <li
                    style={{
                      color:description4SybolError===true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      description4SybolError===false? 
                      'rgba(20, 216, 28, 1)'
                      :
                      ""
                    }}
                  >
                    მინიმუმ 4 სიმბოლო
                  </li>
                </ul>
            </div> 
            
            {/*****date */}
            <div>
              <label className='add_blogs_label' htmlFor='date'>გამოქვეყნების თარიღი *</label>
              <input 
                className='common_input' 
                type="date" 
                name='date' 
                required
                value={blogDate ? blogDate.toISOString().split('T')[0] : ''}
                onChange={handleDateChange}
                style={{
                  backgroundColor: blogDate ? "rgba(248, 255, 248, 1)" : "",
                  borderColor: blogDate ? "rgba(20, 216, 28, 1)" : "",
                }}
              />
            </div>  

            {/*****category */}
            <div>
              <label className='add_blogs_label' htmlFor='catecory'>კატეგორია *</label>
              <Select
                className='common_input'
                options={categoriesData && categoriesData.map((category) => ({
                  id:category.id,
                  label: category.title,
                  value: category.title,
                  background_color: category.background_color,
                  text_color: category.text_color,
                }))}
                isMulti
                value={selectedCategories}
                onChange={handleCategoryChange}
                styles={customStyles}
                required
              />
            </div>  
            

            {/*****email */}
            <div>
              <label className='add_blogs_label' htmlFor='email'>ელ-ფოსტა *</label>
                <input 
                  style={{
                    backgroundColor:emailError===true? "rgba(250, 242, 243, 1)"  : emailError===false? "rgba(248, 255, 248, 1)" :"",
                    borderColor:emailError===true? "rgba(234, 25, 25, 1)" : emailError===false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>emailHandler(e)}
                  className='common_input' 
                  type="email" 
                  name='email' 
                  value={email}
                  placeholder='Example@redberry.ge' 
                />
                {
                  emailError && 
                  <p style={{marginLeft:"-20px"}} className='login_error'>
                    <MdError className='error_icon'/>
                    <span>მეილი უნდა მთავრდებოდეს @redberry.ge -ით</span>
                  </p>
                }
            </div>  
          
          </div>
          
          <div className='publish_button_div'>
            <button
              onClick={handlerSubmit}  
              className='publish_button' 
              disabled={allErrorChecker}
              style={{
                backgroundColor:allErrorChecker? "" : "rgba(93, 55, 243, 1)", 
                cursor:allErrorChecker? "" : "pointer",

              }}
            >
              გამოქვეყნება
            </button>  
          </div>
        </form>
      </div>
      {
        SuccessPostPopup===true &&
        <>
          <div className='login_background'></div>
          <div className='login_popup'>
            <p className='close_button'><Link to="/"><IoCloseSharp className='close_button'/></Link></p>

            <img className='succsess_img' src='./img/succsessImg.png'/>
            <p className='authorized_text'>ბლოგი წარმატებით დაემატა</p>
            <Link to="/"><button className='login_submit'>მთავარ გვერდზე დაბრუნება</button></Link>
          </div>
        </>
      }

      </div>)
      :
      <h2>გვერდი ვერ მოიძებნა! <Link to='/'>დაბრუნდით უკან</Link> და გთხოვთ გაიარეთ რეგისტრაცია</h2>
    }
    </>
  );
}
export default AddBlogs;