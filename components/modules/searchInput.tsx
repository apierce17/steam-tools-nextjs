import styles from '../../styles/components/inputs.module.css'

import { FaSearch } from 'react-icons/fa'

export default function SearchBar(props: {register: any}) {
  return (
    <div className={styles.searchWrapper}>
      <input type="text" title="Search" placeholder='Search Steam users..' {...props.register}/>
      <button title='Search'><FaSearch/></button>
    </div>
  );
}
