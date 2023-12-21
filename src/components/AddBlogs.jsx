import React, { useRef, useState } from 'react';
import { MdNoMealsOuline } from 'react-icons/md';

function AddBlogs() {
  const [selectedFile, setSelectedFile] = useState(null);

  {/*****author input states */}
  const [author,setAuthor]=useState("")
  const [authorfourSybolError,setAuthorFourSymbolError]=useState()
  const [authorTwoWordsError,setAuthorTwoWordsError]=useState()
  const [authorGeorgiaSymbolsError,setAuthorGeorgianSymbolError]=useState()

  const [inputErrorColor,setInputErrorColor]=useState(false)
  {/*****author input states -end */}


  const fileInputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click();
  };

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
      setInputErrorColor(false);
    } else if (!hasEnoughSymbols || !hasEnoughWords || !containsOnlyGeorgianLetters) {
      setInputErrorColor(true);
    } else {
      setInputErrorColor(false);
    }
  
    setAuthor(inputValue);
  };
  {/******author handler -end */}

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
              <label className='add_blogs_label' htmlFor='author'>ავტორი *</label>
                <input 
                  style={{
                    backgroundColor:inputErrorColor==true && "rgba(250, 242, 243, 1)",
                    borderColor:inputErrorColor==true && "rgba(234, 25, 25, 1)"
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

            <div>
              <label className='add_blogs_label' htmlFor='header'>სათაური *</label>
                <input 
                  className='common_input' 
                  type="text" 
                  name='header' 
                  placeholder='შეიყვანეთ სათაური' 
                  required 
                />
                <ul className='validation_list'>
                  <li>მინიმუმ 2 სიმბოლო</li>
                </ul>
            </div>  

            <div>
              <label className='add_blogs_label' htmlFor='desctiption'>აღწერა *</label>
                <textarea 
                  className='desctription_input' 
                  type="text" 
                  name='description' 
                  placeholder='შეიყვანეთ სათაური' 
                  required 
                />
                <ul className='validation_list'>
                  <li>მინიმუმ 4 სიმბოლო</li>
                </ul>
            </div> 

            <div>
              <label className='add_blogs_label' htmlFor='date'>გამოქვეყნების თარიღი *</label>
                <input 
                  className='common_input' 
                  type="date" 
                  name='date' 
                  required 
                />
            </div>  

            
            <div>
              <label className='add_blogs_label' htmlFor='catecory'>კატეგორია *</label>
                <input 
                  className='common_input' 
                  type="select" 
                  name='catecory' 
                  required 
                />
            </div>  

            
            <div>
              <label className='add_blogs_label' htmlFor='email'>ელ-ფოსტა *</label>
                <input 
                  className='common_input' 
                  type="email" 
                  name='email' 
                  placeholder='Example@redberry.ge' 
                />
            </div>  
          
          </div>
          
          <div className='publish_button_div'>
            <button className='publish_button' disabled>გამოქვეყნება</button>  
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlogs;