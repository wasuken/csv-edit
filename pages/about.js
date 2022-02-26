import Head from "next/head";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../styles/Home.module.css";

import { useCSVContext } from "../context/csv";
import Header from "../components/Header.jsx";

export default function Home() {
	const { csv, setcsv } = useCSVContext();
	return (
		<div className={styles.container}>
			<Header />
			<div className="m-2"></div>
			<img className="rounded img-thumbnail" alt="説明" src="/example.png"/>
			<div className="m-2">
				<h3>
					CSV読み込み~表示
				</h3>
				<ui className="list-group list-group-numbered">
					<li className="list-group-item">
						「CSVファイルアップロードボタン」押下、CSVファイルを選択
					</li>
					<li className="list-group-item">
						「Open」ボタンを押下
					</li>
				</ui>
				<div className="m-2"></div>
				<h3>
					検索
				</h3>
				<ui className="list-group list-group-numbered">
					<li className="list-group-item">
						「検索クエリテキストボックス」へ検索文字列を入力
					</li>
					<li className="list-group-item">
						「Search」ボタンを押下
					</li>
				</ui>
				<h3>
					その他機能
				</h3>
				<ui className="list-group">
					<li className="list-group-item">
						ソート: 「ヘッダ」のソートしたい列名をクリック
					</li>
					<li className="list-group-item">
						ページネーション: First,Lastは1ページ、最終ページヘ移動、Previous,Nextはそれぞれ一つ前にもどる、すすむ
					</li>
					<li className="list-group-item">
						rollback:「rollback」ボタンにより、過去の状態へもどすことができる。ただし、5つ前までが最大。
					</li>
					<li className="list-group-item">
						ページ移動: 「選択ページ」で移動したいページを選択
					</li>
				</ui>
			</div>
		</div>
	);
}
