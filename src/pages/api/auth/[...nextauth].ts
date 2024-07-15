import NextAuth, { AuthOptions } from 'next-auth'

export const authOptions = {
  providers: [
    {
      id: 'saltire',
      name: 'LTI via saLTIre',
      type: 'oauth',
      jwks_endpoint:
        'https://saltire.lti.app/platform/jwks/d2e59551f4d0df9275c5055cbac2cb22',
      authorization: {
        url: 'https://saltire.lti.app/platform/auth',
        params: {
          response_type: 'id_token',
          response_mode: 'form_post',
          nonce: 'nonce_value',
          login_hint: 'login_hint_value',
          id_token_signed_response_alg: 'RS256',
          prompt: 'none',
          lti_message_hint: 'My LTI message hint!',
          lti_deployment_id: 'cLWwj9cbmkSrCNsckEFBmA',
        },
      },
      token:
        'https://saltire.lti.app/platform/token/d2e59551f4d0df9275c5055cbac2cb22',
      idToken: true,
      profile: (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
      client: { client_id: 'saltire.lti.app' },
    },
  ],
  logger: {
    error: console.error,
    warn: console.warn,
    info: console.log,
    debug: console.log,
  },
} as AuthOptions

export default NextAuth(authOptions)
