import SignInForm from '../../../components/SignInForm'
import "../auth.css"

export default function LogIn() {
  return (
    <div className="bd w-screen h-screen flex justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-accent to-transparent opacity-90"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-80"></div>
      <main className="flex flex-col justify-around h-full w-5/6 max-w-md items-center z-50 text-white gap-3">
        <section className="flex flex-col justify-center w-full items-center gap-2">
          <h1 className=" text-6xl font-semibold">E-cológico</h1>
          <p>El único eCommerce sostenible</p>
        </section>
        <SignInForm />
      </main>
    </div >
  )
}
