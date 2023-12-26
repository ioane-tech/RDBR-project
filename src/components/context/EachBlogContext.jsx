import React, { createContext, useState } from 'react';

const BlogContext = createContext();

export const EachBlogProvider = ({children}) => {
    const [exactBlogId, setExactBlogId] = useState();
    return (
      <BlogContext.Provider value={{exactBlogId,setExactBlogId}}>
        {children}
      </BlogContext.Provider>
    );
  };
  
  export default BlogContext;