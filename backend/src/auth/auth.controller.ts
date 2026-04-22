import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login() {
    // Implement login logic here
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const encryptedPassword = await this.authService.encodePassword(password);
    try {
      await this.authService.registerUser(email, encryptedPassword);
      return { message: 'User registered successfully' };
    } catch (error) {
      return { message: 'Error registering user', error: error.message };
    }
  }
}
