import classNames from 'classnames'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import styles from './styles.module.scss'

interface Props {
  content: {
    year: string;
    desc: string;
  }[];
}

const Slider = ({ content }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={80}
        slidesPerView={3}
        draggable
        navigation={{
          prevEl: '.slider-nav-prev',
          nextEl: '.slider-nav-next',
        }}
        pagination={{
          el: '.slider-pagination',
          clickable: true,
        }}
        className={styles.slider}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 64,
          }
        }}
      >
        {content.map(el => <SwiperSlide key={el.year} className={styles.slide}>
          <span>{el.year}</span>
          <p>{el.desc}</p>
        </SwiperSlide>)}
      </Swiper>
      <div className={styles.navWrap}>
        <button className={classNames('slider-nav-prev', styles.navBtn, styles.navPrev)}/>
        <button className={classNames('slider-nav-next', styles.navBtn, styles.navNext)}/>
      </div>
      <div className={classNames('slider-pagination', styles.pagination)}/>
    </div>
  )
}

export default Slider
