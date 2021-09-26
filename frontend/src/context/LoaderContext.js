import { createContext, useContext, useState } from "react";

const LoaderContext = createContext()

const LoaderContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(false)

  const showLoader = () => {
    setLoader(true)
  }

  const hideLoader = () => {
    setLoader(false)
  }

  return (
    <LoaderContext.Provider value={{
      loader,
      showLoader,
      hideLoader
    }}>
      {children}
    </LoaderContext.Provider>
  )
}

export default LoaderContextProvider

const useLoaderContext = () => useContext(LoaderContext)

export {
  useLoaderContext
}
