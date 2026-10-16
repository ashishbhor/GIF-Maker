import { useDispatch, useSelector } from "react-redux"
import { setActiveTabs } from "../redux/Features/searchSlice"


function Tabs() {
  const tabs = ['photos', 'videos', 'gif']
  const activeTab = useSelector((state)=> state.search.activeTab)
  
  const dispatch = useDispatch()
    return (

    <div className="flex gap-5 p-10">
      {tabs.map(function (elem, idx) {
        return (
          <button onClick={() => {
            dispatch(setActiveTabs(elem))
          }}
            className={`${(activeTab == elem ? 'bg-blue-500' : 'bg-gray-600')}  
            transition cursor-pointer uppercase scale-95 rounded px-5 py-2`} key={idx}>{elem}
            </button>
        )
        })}
    </div>
  )
}

export default Tabs