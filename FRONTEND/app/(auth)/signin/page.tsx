'use client'

import Link from 'next/link'
import AuthHeader from '../auth-header'
import AuthImage from '../auth-image'
import { useState } from 'react';
import axios from 'axios';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function SignIn() {

  const [formData, setFormData] = useState({ email: '', password: '', address: '' });
  const address = '0x391FB980526B32fE88796273cEA486468dA0ABCD';///placeholder
  async function handleSubmit(){
    console.log('Form data:', formData);
    try {
      const response = await axios.post('/api/auth',{
        data: formData,
        headers: {
          'Content-Type': 'application/json'
        }});
      console.log(response.data,"res");
      const token = response.data.token;
      console.log(token,"token");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  return (
    <main className="bg-white dark:bg-slate-900">

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            <AuthHeader />

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Welcome back! ✨</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {handleInputChange(e)}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input
                      id="password"
                      className="form-input w-full"
                      type="password"
                      value={formData.password}
                      onChange={(e) => {handleInputChange(e)}}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link className="text-sm underline hover:no-underline" href="/reset-password">Forgot Password?</Link>
                  </div>
                  <button 
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3" 
                    onClick={() => { handleSubmit() }}
                  >Sign In</button>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  Don't you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400" href="/signup">Sign Up</Link>
                </div>
                <p className='text-slate-500 mt-5'>OR</p>
                <div className='mt-5'><ConnectButton label="Connect with Web3 Wallet" /></div>
{/*                 <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white mt-5">Connect with Web3 Wallet</button>
 */}                
              </div>
            </div>

          </div>
        </div>

        <AuthImage />

      </div>

    </main>
  )
}