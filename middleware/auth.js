const users = [{
  username: 'test',
  password: '1234',
  courses: {
    introduction_html: {
      locked: [
        "HTML Code",
        ""
      ]
    }
  }
}]; // Contoh user untuk testing

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(400).json({ status: 'fail', message: 'Username-nya belum terdaftar cuy!' });
  }

  if (user.password !== password) {
    return res.status(400).json({ status: 'fail', message: 'Password-nya salah nih!' });
  }

  // Simpan cookie jika login berhasil
  res.cookie('user', JSON.stringify({ username }), { httpOnly: true });
  return res.json({ status: 'success', message: 'Login berhasil, selamat datang!' });
};

exports.register = (req, res) => {
  const { username, password } = req.body;
  const userExists = users.some(u => u.username === username);

  if (userExists) {
    return res.status(400).json({ status: 'fail', message: 'Username ini udah dipake, coba yang lain ya!' });
  }

  users.push({ username, password });
  res.cookie('user', JSON.stringify({ username }), { httpOnly: true });
  return res.json({ status: 'success', message: 'Registrasi berhasil, langsung login yuk!' });
};
