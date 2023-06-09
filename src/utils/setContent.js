import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, Component, data) => {
   switch (process) {
      case 'waiting':
         return <Skeleton />
         break;
      case 'loading':
         return <Spinner />
         break;
      case 'content':
         return <Component data={data} />
         break;
      case 'error':
         return <ErrorMessage />
         break;
   }
}


export default setContent