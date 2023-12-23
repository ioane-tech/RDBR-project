import React, { useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import { MdError } from "react-icons/md";
import { token } from '../Token';
function AddBlogs() {
  const [categoriesData,setCategoriesData]=useState()
  const [allErrorChecker,setAllErrorCecker]=useState(false)
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

{/****categories state */}
  const [selectedCategories, setSelectedCategories] = useState([]);

{/**date state */}
const [blogDate, setBlogDate] = useState(null);

{/*****author input states */}
  const [author,setAuthor]=useState("")

  const [authorfourSybolError,setAuthorFourSymbolError]=useState()
  const [authorTwoWordsError,setAuthorTwoWordsError]=useState()
  const [authorGeorgiaSymbolsError,setAuthorGeorgianSymbolError]=useState()

  const [inputErrorColor,setInputErrorColor]=useState()

{/*****header input states */}
  const [header,setHeader]=useState("")

  const [headerTwoSybolError,setheaderTwoSymbolError]=useState()

{/*****description input states */}
  const [description,setDescription]=useState("")
  const [description4SybolError,setdescription4SymbolError]=useState()

{/*****email input states */}
  const [email,setEmail]=useState("")
  const [emailError,setEmailError]=useState()





{/**************************************** handlers *************************** */}
{/***file upload handler */}
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
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
    
    const hasEnoughSymbols = inputValue.length >= 4;
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

    const hasEnoughSymbols = inputValue.length >= 2;
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

    const hasEnoughSymbols = inputValue.length >= 4;
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
      emailError==null){
        setAllErrorCecker(true)
      }else{
        setAllErrorCecker(false)
      }
  },[authorfourSybolError,authorTwoWordsError,authorGeorgiaSymbolsError,headerTwoSybolError,description4SybolError,emailError])


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
        console.log(data.data);
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
      height:"44px",
      overflowY:'auto',
      display:'block',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? state.data.background_color : 'transparent',
      color: state.isSelected ? state.data.text_color : '#333',
      borderRadius: '30px',
      padding: '8px 12px',
      margin: '8px 0',
      backgroundColor: state.data.background_color,
      color: state.data.text_color,
      cursor:'pointer',
      ':hover': {
        opacity:'0.6'
      },
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
      borderRadius: '30px',
      backgroundColor: '#fff',
      padding: '8px 0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      overflowX: 'auto', 
      maxWidth: '100%', 
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

    const formattedDate = blogDate ? blogDate.toISOString().split('T')[0] : '';

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', header);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('publish_date', formattedDate);
    formData.append('categories', JSON.stringify(selectedCategories.map(category => category.value)));
    formData.append('email', email);

    fetch("https://api.blog.redberryinternship.ge/api/blogs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, 
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      } else {
      }
    })
    .catch((error) => {
      console.error('Error sending data:', error);
    });
  };

  return (
    <div>
      <div className='add_blog_container'>
        <p className='add_blogs_header'>ბლოგის დამატება</p>

        <form action="">

          <label className='add_blogs_label' htmlFor='photo'>ატვირთეთ ფოტო</label>
            {
              selectedFile==null?
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
                  <span>{selectedFile.name}</span> 
                  <p onClick={removeFile}>&times;</p>
                </div>
              )
            }

          <div className='form_container'>
            <div>
              {/*****author */}
              <label className='add_blogs_label' htmlFor='author'>ავტორი *</label>
                <input 
                  style={{
                    backgroundColor:inputErrorColor==true? "rgba(250, 242, 243, 1)" : inputErrorColor==false? "rgba(248, 255, 248, 1)" : "",
                    borderColor:inputErrorColor==true? "rgba(234, 25, 25, 1)" : inputErrorColor==false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>authorWrightHandler(e)}
                  className='common_input' 
                  type="text" 
                  name='author' 
                  placeholder='შეიყვანეთ ავტორი' 
                  required  
                />
                <ul className='validation_list'>
                  <li 
                    style={{
                      color:authorfourSybolError==true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      authorfourSybolError==false? 
                      'rgba(20, 216, 28, 1)'
                      :
                      authorfourSybolError==null? 
                      "rgba(133, 133, 141, 1)"
                      :
                      ""
                    }}
                  >
                    მინიმუმ 4 სიმბოლო
                  </li>
                  <li 
                    style={{
                      color:authorTwoWordsError==true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      authorTwoWordsError==false? 
                      'rgba(20, 216, 28, 1)'
                      :
                      ""
                    }}
                  >
                    მინიმუმ 2 სიტყვა
                  </li>
                  <li 
                    style={{
                      color:authorGeorgiaSymbolsError==true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      authorGeorgiaSymbolsError==false? 
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
                    backgroundColor:headerTwoSybolError==true? "rgba(250, 242, 243, 1)"  : headerTwoSybolError==false? "rgba(248, 255, 248, 1)" :"",
                    borderColor:headerTwoSybolError==true? "rgba(234, 25, 25, 1)" : headerTwoSybolError==false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>headerInputHandler(e)}
                  className='common_input' 
                  type="text" 
                  name='header' 
                  placeholder='შეიყვანეთ სათაური' 
                  required 
                />
                <ul className='validation_list'>
                  <li
                    style={{
                      color:headerTwoSybolError==true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      headerTwoSybolError==false? 
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
                    backgroundColor:description4SybolError==true? "rgba(250, 242, 243, 1)"  : description4SybolError==false? "rgba(248, 255, 248, 1)" :"",
                    borderColor:description4SybolError==true? "rgba(234, 25, 25, 1)" : description4SybolError==false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>descriptionHandler(e)}
                  className='desctription_input' 
                  type="text" 
                  name='description' 
                  placeholder='შეიყვანეთ სათაური' 
                  required 
                />
                <ul className='validation_list'>
                  <li
                    style={{
                      color:description4SybolError==true? 
                      "rgba(234, 25, 25, 1)"
                      :
                      description4SybolError==false? 
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
                    backgroundColor:emailError==true? "rgba(250, 242, 243, 1)"  : emailError==false? "rgba(248, 255, 248, 1)" :"",
                    borderColor:emailError==true? "rgba(234, 25, 25, 1)" : emailError==false? "rgba(20, 216, 28, 1)" : ""
                  }}
                  onChange={(e)=>emailHandler(e)}
                  className='common_input' 
                  type="email" 
                  name='email' 
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
    </div>
  );
}
export default AddBlogs;