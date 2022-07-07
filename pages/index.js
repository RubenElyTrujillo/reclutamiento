import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import PaymentsForms from '../components/PaymentForms'

export default function Home() {
  return (
    <div className="layout">
      <PaymentsForms />
    </div>
  )
}
