import Link from "next/link"
import styles from "./top-navigation.module.css"

export default function TopNavigation() {
  return (
    <nav className={styles["top-navigation"]}>
      <ul className={styles["list"]}>
        <li>
          <Link href="/mypage">アカウント</Link>
        </li>
      </ul>
    </nav>
  )
};
