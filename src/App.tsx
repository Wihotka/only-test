// раскомментировать нужный JSON
import data from './mock/data-1.json' // 6 элементов
// import data from './mock/data-2.json' // 8 элементов
// import data from './mock/data-3.json' // 4 элемента

import DateRange from './components/dateRange/DateRange'

function App() {
  return (
    <>
      <DateRange data={data.data}/>
    </>
  )
}

export default App
