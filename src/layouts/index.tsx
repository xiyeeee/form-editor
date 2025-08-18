import { Link, Outlet } from 'umi';
import { Provider } from 'react-redux';
import { store } from '@/store';
import styles from './index.less';

export default function Layout() {
  return (
    <Provider store={store}>
      <div className={styles.navs}>
        <ul>
          <li>
            <Link to="/form-editor">Form Editor</Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </Provider>
  );
}
