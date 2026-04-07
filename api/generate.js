export default async function handler(req, res) {
  const { idea, goal, time } = req.body;

  const prompt = `
You are Initia, a warm, aesthetic, motivational AI.

User idea: ${idea}
Goal: ${goal}
Time per day: ${time}

Give:
- 5 creative ideas
- 5-step simple plan
- short checklist

Keep it warm, aesthetic, and short.
`;

  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    }
  );

  const data = await response.json();

  res.status(200).json({ result: data });
}
