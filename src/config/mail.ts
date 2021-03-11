interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'dny8888@whosnext.app.br',
      name: 'Daniel da WhosNext',
    },
  },
} as IMailConfig;
