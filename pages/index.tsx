import Link from 'next/link';
import Hero from '../components/sections/hero';
import styles from '../styles/pages/Home.module.css'
import {BsGrid3X2GapFill} from 'react-icons/bs'
import { GiCardRandom } from 'react-icons/gi';
Home.title = '';
export default function Home() {

  const Tile = (props: {name:string, route: string, icon: any, title: string}) => {
    return (
      <div className={styles.tileWrapper}>
        <div className={styles.icon}>{props.icon}</div>
        <p>{props.title}</p>
        <Link href={props.route}>
          <button className='greenButton'>{props.name}</button>
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.contentWrapper}>
      <Tile name={'Compare'} route={'/compare'} icon={<BsGrid3X2GapFill/>} title={'Compare games with friends and find something to play!'}/>
      {/* <Tile name={'Random'} route={'/random'} icon={<GiCardRandom/>} title={'Find a random item on Steam!'}/> */}
    </div>
  );
}