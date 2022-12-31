
// new authentication approach to avoid duplicate user queries
    // will be applied only if the data is same between /userprofile and /user/{id}
    // the state will solve the problem of errors in console

const [isAuth, setIsAuth] = useState(false)

if (!isAuth) {
    // send a request to /auth
    const { isLoading, data:response, error } = useAuth({ enabled: token})
    if (isAuthenticating) return <Spinner />
    if (response.status !== 200) return <Login />
    if ('data' in response) {
        setIsAuth({ userId: response.data.user_id })
        return; // to avoid different number of hooks rendered in previous render 
    }
}

const { isLoading, data:response, error} = useCurrentUser()

if (isLoading) return <Spinner />
if (response.status !== 200) {
    setIsAuth(false)
    return;
}
if ('data' in response.data) return <MyApp />
if (error) return <h1>Error { error.message }</h1>
