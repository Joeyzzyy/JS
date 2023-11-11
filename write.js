<!DOCTYPE html>
<html>
<head>
    <title>直播口播脚本润色&生成</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
    const {
        React,
        ReactDOM,
        MaterialUI: { TextField, Button, Typography, Container, CssBaseline, makeStyles, Dialog, DialogTitle, DialogContent, DialogActions, IconButton },
    } = window;

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            width: '100%', 
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

    function ScriptForm() {
        const classes = useStyles();
        const [brandName, setBrandName] = React.useState('');
        const [brandDescription, setBrandDescription] = React.useState('');
        const [productName, setProductName] = React.useState('');
        const [productDescription, setProductDescription] = React.useState('');
        const [originalScript, setOriginalScript] = React.useState('');
        const [selectedPlatform, setSelectedPlatform] = React.useState('');
        const [characterNickname, setCharacterNickname] = React.useState('');
        const [script, setScript] = React.useState('');
        const [open, setOpen] = React.useState(false);

        const handleSubmit = (event) => {
            event.preventDefault();
            const generatedScript = generateScript(brandName, brandDescription, productName, productDescription, originalScript, selectedPlatform, characterNickname);
            setScript(JSON.stringify(generatedScript, null, 2));
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleCopy = () => {
            navigator.clipboard.writeText(script);
        };

        const generateScript = (brandName, brandDescription, productName, productDescription, originalScript, selectedPlatform, characterNickname) => {
            var engagementSentencesWithNicknameStructure = {
                "Example1": "来我们欢迎新进直播间的宝宝，还没点关注的宝贝记得先点下咱们左上方的关注，我是" + characterNickname + "，今天的主播哦！",
                "Example2": "欢迎新进直播间的宝宝，大家有什么问题都可以问到主播的，我是" + characterNickname + "，那没点关注的宝宝可以先点个关注哦！",
                "Example3": "来欢迎新进直播间的宝宝，我是" + characterNickname + "，很高兴见到大家！",
                "Example4": "没有点关注的宝宝，记得先点个关注哦，我是" + characterNickname + "，今天会为大家带来超多惊喜！"
            };

            var excellentEngagementExample = {
                "Example1": "有烫染受损，头发变得干枯毛躁易打结，还脆弱易断易掉困扰的宝宝们，来试试我们家的这款热门产品——第二代三分钟奇迹护发素吧！"
            };

            var prompt = {
                "BrandInformation": {
                    "BrandName": brandName,
                    "BrandDescription": brandDescription
                },
                "ProductInformation": {
                    "ProductName": productName,
                    "ProductDescription": productDescription,
                    "ProductOriginalScript": originalScript
                },
                "Task": {
                    "Objective": "As a live streaming selling expert, please help me polish your product description into a medium-length, high-quality live broadcast script. Please remember to simulate a human tone and have a complete opening.",
                    "Requirements": {
                        "Rule1": "Combine BrandName, BroadcastPlatform and EngagementSentences to generate a complete opening statement.",
                        "Rule2": "Please strictly refer to the content in ProductOriginalScript, make appropriate deletions and adjustments, to achieve the most perfect broadcast effect for the entire script.",
                        "Rule3": "Do not include Emojis in the generated script and do not need to divide the content into sections or segments, directly produce the entire content.",
                        "Rule4": "Do not end the script with phrases indicating the end of the live broadcast, this is just a product pitch segment, try to end the script with guiding sales talk."
                    },
                    "BroadcastPlatform": selectedPlatform,
                    "EngagementSentences": engagementSentencesWithNicknameStructure,
                    "excellent_engagement_example": excellentEngagementExample,
                    "Response": {
                        "Script": "",
                        "Language": "Chinese"
                    }
                }
            };

            return prompt;
        };

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        直播口播脚本润色&生成
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            label="品牌名称"
                            value={brandName}
                            onChange={(event) => setBrandName(event.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="品牌描述"
                            value={brandDescription}
                            onChange={(event) => setBrandDescription(event.target.value)}
                            margin="normal"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="产品名称"
                            value={productName}
                            onChange={(event) => setProductName(event.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="产品描述"
                            value={productDescription}
                            onChange={(event) => setProductDescription(event.target.value)}
                            margin="normal"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="客户提供的原始脚本"
                            value={originalScript}
                            onChange={(event) => setOriginalScript(event.target.value)}
                            margin="normal"
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="选择的平台"
                            value={selectedPlatform}
                            onChange={(event) => setSelectedPlatform(event.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="角色昵称"
                            value={characterNickname}
                            onChange={(event) => setCharacterNickname(event.target.value)}
                            margin="normal"
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                            生成提示词
                        </Button>
                    </form>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">提示词</DialogTitle>
                        <DialogContent>
                            <Typography variant="body1" gutterBottom>
                                {script}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCopy} color="primary">
                                复制    
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                关闭
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        );
    }

    ReactDOM.render(<ScriptForm />, document.getElementById('root'));
    </script>
</body>
</html>
