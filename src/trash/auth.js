
	try to update the cache of 'get-user' before try this

	const [isAuth, setIsAuth] = useState(false)
	const { isLoading, data:response, error } = useCurrentUser()

	if (isLoading) return <DevCommunityLoader />
	if ('data' in response) {
		if (!isAuth) return <Login />
		return <MyApp />
	}
	if (error) return error.message

	// useCurrentUser
	onSuccess: res => {
		if (res.ok) dispatch({ type: ACTIONS.AUTHENTICATE_USER })
	}

	// login 
	onSuccess: res => {
		if (res.ok) dispatch({ type: ACTIONS.AUTHENTICATE_USER })
	}

	//logout
	dispatch({ type: ACTIONS.UNAUTHENTICATE_USER })