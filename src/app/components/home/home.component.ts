import { Component, OnInit } from '@angular/core'
import { JwtHelperService } from '@auth0/angular-jwt'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  ngOnInit(): void {
    this.getUserCookies()
  }

  getUserCookies() {
    this.data = JSON.parse(localStorage.getItem("userInfo") as string)
  }

  isUserAuthenticated() {
    const token: string | any = localStorage.getItem("jwt")
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true
    }
    else {
      return false
    }
  }

  public logOut = () => {
    localStorage.removeItem("jwt")
    localStorage.removeItem("userInfo")
    this.router.navigate(['/login'])
  }

}
