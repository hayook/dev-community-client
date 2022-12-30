
const [isAuth, setIsAuth] = useState(false)

if (!isAuth) {
    // send a request to /auth
    const { isLoading, data:response, error } = useAuth({ enabled: token})
    if (isAuthenticating) return <Spinner />
    if (response.status !== 200) return <Login />
    setIsAuth({ userId: response.data.user_id })
}

const { isLoading, data:response, error} = useUser(isAuth?.userId)

if (isLoading) return <Spinner />
if (response.status !== 200) {
    setIsAuth(false)
    return;
}
if ('data' in response.data) return <MyApp />
if (error) return <h1>Error { error.message }</h1>
