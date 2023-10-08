import {AiOutlineArrowUp} from 'react-icons/ai';

function Arrow() {
  const arrowHandler = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  return(
    <div onClick={arrowHandler} className="fixed right-12 top-15">
      <AiOutlineArrowUp className="text-3xl cursor-pointer rounded-full bg-gray-700 p-2 scale-125"/>
    </div>
  )
}

export default Arrow;