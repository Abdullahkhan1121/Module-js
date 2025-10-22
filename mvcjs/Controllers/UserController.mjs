import fs from 'node:fs';
import { title } from 'node:process';
import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


let index = async (req, res) => {
    try {
        let user = await User.find();
        if (user) {
            res.status(200).json({ message: "All Users!", user: user });
        } else {
            res.status(404).json({ message: "No User found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

let SignUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let UserCheck = await User.findOne({ email: email })
        if (UserCheck) {
            res.status(200).json({ message: "User Already Exist", user: UserCheck });

        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10)
            let newuser = new User(
                {
                    username,
                    email,
                    password: hashedPassword
                }
            )
            let adduser = await newuser.save();

            if (adduser) {
                res.status(200).json({ message: "SignUp Successfully", user: adduser });
            } else {
                res.status(404).json({ message: "No product found" });
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}


let Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let UserCheck = await User.findOne({ email: email })
        if (UserCheck) {

            const CheckPassword = bcrypt.compareSync(password, UserCheck.password)
            if (CheckPassword) {
                const token = await jwt.sign({UserCheck} , process.env.JWT_SECRET , {expiresIn: '1h'})
                res.status(200).json({ message: "Login Success", user: UserCheck , token:token});

            }

        }
        else {
            res.status(200).json({ message: "Invalid Credential", user: UserCheck });


        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

let DeleteUser = async (req, res) => {
    try {
        const { id} = req.params;
        let UserDelete = await User.findByIdAndDelete(id)
        if (UserDelete) {
                res.status(200).json({ message: "User Delete Successfully", user: UserDelete });

        

        }
        else {
            res.status(200).json({ message: "Invalid Credential", user: UserCheck });


        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

//Send mail

const sendEmail = async (req,res) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    let sendMailStatus = await transporter.sendMail({
        from: `"Verify Email" <${process.env.EMAIL_USER}>`,
        to: req.body.email,
        subject: req.body.subject,
        html:`<!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Welcome to [Company]</title>
          <meta name="viewport" content="width=device-width,initial-scale=1">
          <style>
            /* General resets */
            body, table, td, a { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
            img { border:0; height:auto; line-height:100%; outline:none; text-decoration:none; display:block; }
            table { border-collapse:collapse !important; }
            body { width:100% !important; height:100% !important; margin:0; padding:0; background-color:#f4f6f8; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; color:#0f1724; }
        
            /* Container */
            .email-wrapper { width:100%; background:#f4f6f8; padding:20px 0; }
            .email-content { width:100%; max-width:600px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 6px 18px rgba(10,20,40,0.06); }
        
            /* Header */
            .email-header { padding:20px; text-align:left; }
            .brand { display:flex; align-items:center; gap:12px; }
            .logo { width:48px; height:48px; border-radius:8px; background:#e6eef8; display:inline-block; }
        
            /* Body */
            .email-body { padding:28px 24px; }
            h1 { margin:0 0 8px 0; font-size:22px; line-height:1.2; color:#0b1220; }
            p { margin:0 0 16px 0; color:#334155; font-size:15px; line-height:1.5; }
            .muted { color:#6b7280; font-size:13px; }
        
            /* CTA */
            .button { display:inline-block; padding:12px 20px; border-radius:8px; text-decoration:none; font-weight:600; background:#2563eb; color:#ffffff; }
            .secondary { display:inline-block; padding:10px 16px; border-radius:8px; text-decoration:none; border:1px solid #e6eef8; color:#2563eb; background:transparent; }
        
            /* Footer */
            .email-footer { padding:20px 24px; border-top:1px solid #eef2f7; font-size:13px; color:#7c8797; }
            .social { margin-top:8px; display:flex; gap:8px; }
        
            /* Responsive */
            @media screen and (max-width:420px) {
              .email-body { padding:20px 16px; }
              h1 { font-size:20px; }
              .logo { width:40px; height:40px; }
            }
          </style>
        </head>
        <body>
          <!-- Preheader (shows in inbox preview) -->
          <span style="display:none; max-height:0; overflow:hidden; font-size:0; line-height:0; color:transparent;">
            Welcome aboard! Here's everything to get started with [Company].
          </span>
        
          <div class="email-wrapper" aria-hidden="false">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <div class="email-content" role="article" aria-label="Welcome email from [Company]">
                    <!-- Header -->
                    <div class="email-header">
                      <table role="presentation" width="100%">
                        <tr>
                          <td style="vertical-align:middle;">
                            <div class="brand" aria-hidden="false">
                              <!-- Replace src with your logo or keep placeholder -->
                              <img src="https://via.placeholder.com/48x48.png?text=Logo" alt="[Company] logo" class="logo" width="48" height="48" style="display:inline-block;">
                              <div>
                                <div style="font-weight:700; color:#0b1220;">[Company]</div>
                                <div class="muted" style="margin-top:2px;">Welcome to the community</div>
                              </div>
                            </div>
                          </td>
                          <td style="text-align:right; vertical-align:middle;">
                            <div class="muted" style="font-size:12px;">Need help? <a href="mailto:support@company.example" style="color:#2563eb; text-decoration:none;">support@company.example</a></div>
                          </td>
                        </tr>
                      </table>
                    </div>
        
                    <!-- Body -->
                    <div class="email-body">
                      <h1>Hi {{firstName}}, welcome aboard 👋</h1>
                      <p>Thanks for joining <strong>[Company]</strong> — we’re excited to have you. You’re all set to start exploring. Below are a few things to help you get rolling:</p>
        
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0 18px 0;">
                        <tr>
                          <td style="vertical-align:top; padding-right:12px; width:64px;">
                            <div style="width:48px; height:48px; border-radius:10px; background:#f1f8ff; display:flex; align-items:center; justify-content:center; font-weight:700; color:#2563eb;">1</div>
                          </td>
                          <td style="vertical-align:top;">
                            <div style="font-weight:600; margin-bottom:6px;">Set up your profile</div>
                            <div class="muted">Add a profile picture and some details so others recognize you.</div>
                          </td>
                        </tr>
                      </table>
        
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:18px;">
                        <tr>
                          <td style="vertical-align:top; padding-right:12px; width:64px;">
                            <div style="width:48px; height:48px; border-radius:10px; background:#fff7ed; display:flex; align-items:center; justify-content:center; font-weight:700; color:#f59e0b;">2</div>
                          </td>
                          <td style="vertical-align:top;">
                            <div style="font-weight:600; margin-bottom:6px;">Explore features</div>
                            <div class="muted">Check out our guides and curated collections to discover the best practices.</div>
                          </td>
                        </tr>
                      </table>
        
                      <p style="margin-bottom:22px;">If you want to jump in now, click the button below to go to your dashboard.</p>
        
                      <!-- CTA -->
                      <p style="margin:0 0 20px 0;">
                        <a href="{{dashboardUrl}}" class="button" role="button" aria-label="Go to your dashboard">Go to your dashboard</a>
                        &nbsp;&nbsp;
                        <a href="{{learnMoreUrl}}" class="secondary" role="button" aria-label="Learn more">Learn more</a>
                      </p>
        
                      <hr style="border:none; border-top:1px solid #eef2f7; margin:22px 0;">
        
                      <p class="muted" style="margin-bottom:0;">Questions? Reply to this email or visit our <a href="{{helpCenterUrl}}" style="color:#2563eb; text-decoration:none;">Help Center</a>. We're happy to help.</p>
        
                    </div>
        
                    <!-- Footer -->
                    <div class="email-footer">
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
                        <div style="min-width:160px;">
                          <div style="font-weight:600; color:#0b1220;">[Company]</div>
                          <div class="muted">123 Example Street, City, Country</div>
                        </div>
                        <div style="text-align:right;">
                          <div class="muted">Follow us</div>
                          <div class="social" aria-hidden="false">
                            <!-- Replace with actual links -->
                            <a href="#" style="text-decoration:none; font-size:13px;">Twitter</a>
                            <a href="#" style="text-decoration:none; font-size:13px;">LinkedIn</a>
                            <a href="#" style="text-decoration:none; font-size:13px;">Instagram</a>
                          </div>
                        </div>
                      </div>
        
                      <div style="margin-top:14px; font-size:12px;">
                        <div class="muted">You received this email because you signed up for <strong>[Company]</strong>.</div>
                        <div style="margin-top:6px;">
                          <a href="{{unsubscribeUrl}}" style="color:#6b7280; text-decoration:underline; font-size:12px;">Unsubscribe</a> • <a href="{{preferencesUrl}}" style="color:#6b7280; text-decoration:underline; font-size:12px;">Manage preferences</a>
                        </div>
                      </div>
                    </div>
        
                  </div>
                </td>
              </tr>
            </table>
          </div>
        
          <!-- Plain-text fallback (for clients that ignore HTML). Some mail systems will automatically create a text-only alternative,
               but including here as a comment for your server-side mail builder. -->
          <!--
          Subject: Welcome to [Company] — Let's get started
        
          Hi {{firstName}},
        
          Thanks for joining [Company]! We're excited to have you. Log in to your dashboard to get started: {{dashboardUrl}}
        
          Need help? Reply to this email or contact support@company.example
        
          Unsubscribe: {{unsubscribeUrl}}
          -->
        </body>
        </html>
        
        `,
    });
    if (sendMailStatus) {
        res.status(200).json({message:"Email sent successfully"})
    } else {
        res.status(400).json({message:"Email sending Failed"})
    }
}


const UserController = {
    index,
    SignUp,
    Login,
    DeleteUser,
    sendEmail
}


export default UserController;