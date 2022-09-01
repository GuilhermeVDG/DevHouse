import Reserve from "../models/Reserve";
import User from "../models/User";
import House from "../models/House";


class ReserveController{
  
  async store(req, res){
    const { user_id } = req.headers;
    const { house_id } = req.params
    const { date } = req.body;

    const house = await House.findById(house_id);
    const user = await User.findById(user_id);

    if(!house) return res.status(400).json({ error: 'House does not exist.' });

    if(house.status !== true) return res.status(400).json({ error: 'Request unavailable.' });

    if(String(user_id) === String(house.user)) return res.status(401).json({ error: 'Unauthorized reserve.' });

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date
    });

    await (await reserve.populate('house')).populate('user');

    return res.json(reserve);
  }
}

export default new ReserveController();