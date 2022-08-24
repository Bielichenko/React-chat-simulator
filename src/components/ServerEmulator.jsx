const serverStorage = [
  [
    {
    date: "20.08.2022",
    id: "v2qg7",
    monthName: "серпень",
    sumOfSec: 43311,
    text: "Good job, chapm!",
    time: "12:01:51",
    type: "send",
  }, 
    {
    date: "20.08.2022",
    id: "v2yu7",
    monthName: "серпень",
    sumOfSec: 43371,
    text: "Maslow's theory of higher needs does not apply to Chuck Norris. He only has two needs: killing people and finding people to kill.Maslow's theory of higher needs does not apply to Chuck Norris. He only has two needs: killing people and finding people to kill.Maslow's theory of higher needs does not apply to Chuck Norris. He only has two needs: killing people and finding people to kill.Maslow's theory of higher needs does not apply to Chuck Norris. He only has two needs: killing people and finding people to kill.Maslow's theory of higher needs does not apply to Chuck Norris. He only has two needs: killing people and finding people to kill.Maslow's theory of higher needs does not apply to Chuck Norris. He only has two needs: killing people and finding people to kill.",
    time: "12:02:51",
    type: "received",
  }, 
    {
    date: "20.08.2022",
    id: "v2fd7",
    monthName: "серпень",
    sumOfSec: 43431,
    text: "What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris. Chuck the Norris.",
    time: "12:03:51",
    type: "send",
  }, 
    {
    date: "20.08.2022",
    id: "v2qw7",
    monthName: "серпень",
    sumOfSec: 43491,
    text: "What you can't argue with is the Chuck Norris motto, which is of the Norris, for the Norris, by the Norris.",
    time: "12:04:51",
    type: "received",
  }, 
],
  [{
    date: "09.05.2022",
    id: "a2bn1",
    monthName: "травень",
    sumOfSec: 58447,
    text: "Have some land lease for you",
    time: "16:14:07",
    type: "received",
  }, 
  {
    date: "09.05.2022",
    id: "axcc1",
    monthName: "травень",
    sumOfSec: 58568,
    text: "Happy to hear it, Joseph",
    time: "16:16:08",
    type: "send",
  }, ],
  [],
]

export const getMessagesFromServer = () => {
  if (!JSON.parse(`${localStorage.getItem('messagesWith1')}`)) {
    localStorage.setItem('messagesWith1', JSON.stringify(serverStorage[0]));
    localStorage.setItem('messagesWith2', JSON.stringify(serverStorage[1]));
    localStorage.setItem('messagesWith3', JSON.stringify(serverStorage[2]));
  };
}
