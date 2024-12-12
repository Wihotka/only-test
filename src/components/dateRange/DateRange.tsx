import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import gsap from 'gsap'
import { transformNumber } from '../../utils'
import AnimatedNumber from '../animatedNumber/AnimatedNumber'
import Slider from '../slider/Slider'
import styles from './styles.module.scss'

interface Props {
  data: {
    id: number;
    title: string;
    range: number[];
    content: {
      year: string;
      desc: string;
    }[];
  }[];
}

const DateRange = ({ data }: Props) => {
  const circleRef = useRef<HTMLDivElement>(null)
  const stagesRef = useRef<HTMLParagraphElement[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [currentId, setCurrentId] = useState(1)
  const [currentEl, setCurrentEl] = useState(data[0])

  const handlePrevClick = () => {
    setCurrentId(prevId => prevId > 1 ? prevId - 1 : data.length)
  }
  const handleNextClick = () => {
    setCurrentId(prevId => prevId < data.length ? prevId + 1 : 1)
  }
  const handleDirectClick = (id: number) => {
    setCurrentId(id)
  }

  useEffect(() => {
    //circle animation
    gsap.to(circleRef.current, {
      rotate: `-${currentId * 360 / data.length}_cw`,
      duration: 1.2,
    })
    gsap.to(stagesRef.current, {
      rotate: `${(currentId - 1) * (360 / data.length)}_ccw`,
      direction: -1,
      duration: 1.2,
    })

    // swiper animation
    setIsLoading(true)
    const timeout = setTimeout(() => {
      setIsLoading(false)
      setCurrentEl(data.find(el => el.id === currentId) || data[0])
    }, 800)

    return () => {
      clearTimeout(timeout)
      setIsLoading(false)
    }
  }, [currentId])

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}>
        <div/>
        <div/>
      </div>
      <h2 className={styles.title}>Исторические даты</h2>
      <div className={styles.range}>
        <div className={styles.range_content}>
          <div className={styles.numbers}>
            <AnimatedNumber value={data.find(el => el.id === currentId)?.range[0] || 0}/>
            <AnimatedNumber value={data.find(el => el.id === currentId)?.range[1] || 0}/>
          </div>
          <div ref={circleRef} className={styles.circle}>
            {data.map((el, i, arr) =>
              <div
                key={el.id}
                className={styles.circle_stage}
                style={{
                  rotate: `${i * 360 / arr.length + (540 / arr.length)}deg`
                }}
              >
                <button
                  className={classNames(styles.circle_stage_btn, el.id === currentId && styles.active)}
                  onClick={() => handleDirectClick(el.id)}
                >
                  <p ref={el => stagesRef.current[i] = el as HTMLParagraphElement}>
                    <span style={{ rotate: `-${i * 360 / arr.length + 180 / arr.length}deg` }}>
                      {el.id}
                    </span>
                  </p>
                </button>
              </div>
            )}
          </div>
          <h3 className={classNames(
            styles.stageTitle,
            isLoading && styles.loading,
            styles[`stageTitle_${data.length}`]
          )}>
            {currentEl.title}
          </h3>
        </div>
      </div>
      <div className={styles.rangeBtns}>
        <p>
          <span>{transformNumber(currentId)}</span>
          <span>/</span>
          <span>{transformNumber(data.length)}</span>
        </p>
        <div>
          <button onClick={handlePrevClick} disabled={currentId === 1}/>
          <button onClick={handleNextClick} disabled={currentId === data.length}/>
        </div>
      </div>
      <div className={classNames(styles.slider, isLoading && styles.loading)}>
        <Slider content={currentEl.content}/>
      </div>
    </div>
  )
}

export default DateRange

