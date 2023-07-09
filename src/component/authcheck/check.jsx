import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import SignupLogin from '@/app/login/page';
import styel from '../../app/login/login.module.css'
import { usePathname } from 'next/navigation';

const AuthWrapper = ({ children }) => {
  const { data: session, status } = useSession();
  const path=usePathname();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>; // Show loading indicator
  }

  if (!session) {
    if(path!=='/login'){
        router.replace('/login')
    }
   return (
    <SignupLogin/>
   )
  }
  return children;
};

export default AuthWrapper;
