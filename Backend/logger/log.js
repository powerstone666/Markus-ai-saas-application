import useragent from 'useragent';
import Logger from '../Schema/user.log.js';
export default async function Log(req, res, email, action) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const agent = useragent.parse(req.headers['user-agent']);
    const os = agent.os.toString();
    const browser = agent.toAgent();
    const device = agent.device.toString();
  
    await Logger.create({
      email: email,
      action: action,
      log: {
        ip: ip,
        os: os,
        device: device,
        browser: browser,
        time: new Date(),
      },
    });
  }
  