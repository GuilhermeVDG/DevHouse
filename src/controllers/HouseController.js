import House from '../models/House';
import User from '../models/User';
class HouseController{
  async index(req, res){
    const { status } = req.query;
    const houses = await House.find({ status });
    return res.json(houses);
  }
  
  async store(req, res){
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;
    const house =  await House.create({
      thumbnail: filename,
      user: user_id,
      description,
      price,
      location,
      status
    });
    return res.json(house);
  }

  
  async update(req, res){
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { user_id } = req.headers;
    const { house_id } = req.params;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)) return res.status(401).json({ error: 'Not autorized.' });
    

     await House.updateOne({ _id: house_id }, {
      thumbnail: filename,
      user: user_id,
      description,
      price,
      location,
      status
    });

    return res.send();
  }

  async destroy(req, res){
    const { house_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const houses = await House.findById(house_id);

    if(String(user._id) !== String(houses.user)) return res.status(401).json({ error: 'Not autorized.' });

    await House.findByIdAndDelete({ _id: house_id });
    
    return res.json({ message: 'Sucefull delete.' });
  }
}

export default new HouseController();