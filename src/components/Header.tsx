import React, {useState, useRef, useEffect} from 'react'
import './Header.styles.css'

const Header = () => {
    interface User {
        username: string
        email: string
        password: string
    }

    interface CartItem {
        name: string
        price: string
    }

    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isUserOpen, setIsUserOpen] = useState(false)
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [isLogin, setIsLogin] = useState(false)
    const [cart, setCart] = useState<CartItem[]>([])

    const cartRef = useRef<HTMLDivElement>(null)
    const userRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLUListElement>(null)

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen)
    }

    const toggleUser = () => {
        setIsUserOpen(!isUserOpen)
    }

    const toggleHamburger = () => {
        setIsHamburgerOpen(!isHamburgerOpen)
    }

    useEffect(() => {
        if (isCartOpen) {
            setCart(JSON.parse(sessionStorage.getItem('cart') || '[]'))
            cartRef.current?.classList.add('active')
            if(isUserOpen) setIsUserOpen(false)
        } else {
            cartRef.current?.classList.remove('active')
        }
    }, [isCartOpen])

    useEffect(() => {
        if (isUserOpen) {
            userRef.current?.classList.add('active')
            if(isCartOpen) setIsCartOpen(false)
        } else {
            userRef.current?.classList.remove('active')
        }
    }, [isUserOpen])

    useEffect(() => {
        if (isHamburgerOpen) {
            hamburgerRef.current?.classList.add('active')
        
        } else {
            hamburgerRef.current?.classList.remove('active')
        }
    }, [isHamburgerOpen])

    useEffect(() => {
        const isloged = sessionStorage.getItem('isLogedIn')
        if (isloged === 'true') {
            setIsLogin(true)
            const user = sessionStorage.getItem('user')
            if (user) {
                setUser(JSON.parse(user))
            }
        }
    }, [])

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (cartRef.current && !cartRef.current.contains(event.target) && !event.target.classList.contains('cart')) {
                setIsCartOpen(false)
            }
            if (userRef.current && !userRef.current.contains(event.target) && !event.target.classList.contains('user-menu')) {
                setIsUserOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, []) 

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsHamburgerOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

  return (
    <header>
        <div className="nav-start">
                <a href="#" className='logo'>
                    <img src="https://i.pinimg.com/564x/10/49/bb/1049bbc8b45e03dc11c4a0d07bc8abfd.jpg" alt="logo" />
                    Yamada Sweet
                </a>
            <nav className="menu">
                <ul className="menu-bar"  ref={hamburgerRef}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Coming</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
        <div className="nav-end">
            <div className="left-menu">
                <div className="cart" onClick={() => toggleCart()}>
                    <i className='bx bx-cart'></i>
                    <span className="cart-number">{cart.length}</span>

                    <div className="cart-dropdown" ref={cartRef}>
                        {
                            cart ? (
                                <div className="cart-items">
                                {
                                    cart.map((item, index) => (
                                        <div className="cart-item" key={index}>
                                            <div className="cart-item-img">
                                                <img src="https://i.pinimg.com/564x/10/49/bb/1049bbc8b45e03dc11c4a0d07bc8abfd.jpg" alt="cart-item" />
                                            </div>
                                            <div className="cart-item-info">
                                                <p className="cart-item-name">{item.name}</p>
                                                <p className="cart-item-price">{item.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                                )
                             : (
                                <p className='dropdown-title'>Your cart is empty</p>
                            )
                        }
                        
                        { !user?.username && (
                                    <><hr /><ul className='auth-options'>
                                  <li><a href="/Auth">Login</a></li>
                              </ul></>
                            )
                        }
                    </div>
                </div>
                <div className="user-menu">
                    <img src="https://i.pinimg.com/564x/10/49/bb/1049bbc8b45e03dc11c4a0d07bc8abfd.jpg" alt="user-profile"  onClick={() => toggleUser()}/>

                    <div className="user-menu-dropdown" ref={userRef}>
                        <p className='dropdown-title'>Hello, <span>{user?.username ? user.username : 'Guest'}</span></p>
                        { user?.username ? (
                                    <>
                                        <ul>
                                            <li><a href="#">Your Profile</a></li>
                                            <li><a href="#">Your Orders</a></li>
                                        </ul>
                                        <hr />
                                        <ul className='auth-options'>
                                            <li><a href="/Auth">Logout</a></li>
                                        </ul>
                                    </>
                            ) : (
                                <>  
                                    <hr />
                                    <ul className='auth-options'>
                                        <li><a href="/Auth">Login</a></li>
                                    </ul>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="hamburger" onClick={() => toggleHamburger()}>
                <i className='bx bx-menu'></i>
            </div>
        </div>
    </header>
  )
}

export default Header