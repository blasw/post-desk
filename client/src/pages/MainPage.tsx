import Header from "../components/Header";
import PostDesk from "../components/PostDesk";

function MainPage() {
  return(
    <div className="flex flex-col gap-16">
      <Header />
      <PostDesk />
    </div>
  )
}

export default MainPage;