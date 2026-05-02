// 应用状态
const state = {
    currentPage: 'apps',
    chats: [],
    currentChatId: null,
    friends: [],
    currentFriendId: null,
    personas: [],
    currentPersonaId: null,
    selectedAvatarColor: '#007AFF',
    selectedAvatarImage: null,
    selectedChatBgImage: null,
    selectedPersonaAvatarImage: null,
    worldbook: [],
    currentEntryId: null,
    currentMonth: new Date(),
    previousPage: null,
    // 音乐相关状态
    musicState: {
        isPlaying: false,
        currentSong: null,
        playlist: [],
        favorites: [],
        audio: new Audio()
    },
    settings: {
        apiUrl: '',
        apiKey: '',
        modelName: 'gpt-3.5-turbo',
        systemPrompt: '你是一个有帮助的AI助手。',
        temperature: 0.7,
        maxTokens: 2048
    }
};

// DOM元素
const elements = {
    statusTime: document.getElementById('statusTime'),
    dynamicIsland: document.getElementById('dynamicIsland'),
    tabBar: document.getElementById('tabBar'),
    weatherTemp: document.getElementById('weatherTemp'),
    weatherDesc: document.getElementById('weatherDesc'),
    weatherLocation: document.getElementById('weatherLocation'),
    chatList: document.getElementById('chatList'),
    chatEmpty: document.getElementById('chatEmpty'),
    newChatBtn: document.getElementById('newChatBtn'),
    friendsBtn: document.getElementById('friendsBtn'),
    friendsList: document.getElementById('friendsList'),
    friendsEmpty: document.getElementById('friendsEmpty'),
    addFriendBtn: document.getElementById('addFriendBtn'),
    charEditTitle: document.getElementById('charEditTitle'),
    charAvatarPreview: document.getElementById('charAvatarPreview'),
    avatarSvg: document.getElementById('avatarSvg'),
    avatarImg: document.getElementById('avatarImg'),
    avatarFileInput: document.getElementById('avatarFileInput'),
    charName: document.getElementById('charName'),
    charPersona: document.getElementById('charPersona'),
    charGreeting: document.getElementById('charGreeting'),
    charScenario: document.getElementById('charScenario'),
    charExample: document.getElementById('charExample'),
    charWorldbook: document.getElementById('charWorldbook'),
    charPersonaMask: document.getElementById('charPersona_mask'),
    useCustomApi: document.getElementById('useCustomApi'),
    customApiSettings: document.getElementById('customApiSettings'),
    charApiUrl: document.getElementById('charApiUrl'),
    charApiKey: document.getElementById('charApiKey'),
    charModelName: document.getElementById('charModelName'),
    chatBgPreview: document.getElementById('chatBgPreview'),
    chatBgText: document.getElementById('chatBgText'),
    chatBgImg: document.getElementById('chatBgImg'),
    chatBgFileInput: document.getElementById('chatBgFileInput'),
    clearBgBtn: document.getElementById('clearBgBtn'),
    charMsgLimit: document.getElementById('charMsgLimit'),
    clearChatHistoryBtn: document.getElementById('clearChatHistoryBtn'),
    saveCharBtn: document.getElementById('saveCharBtn'),
    deleteCharBtn: document.getElementById('deleteCharBtn'),
    personaList: document.getElementById('personaList'),
    personaEmpty: document.getElementById('personaEmpty'),
    addPersonaBtn: document.getElementById('addPersonaBtn'),
    personaEditTitle: document.getElementById('personaEditTitle'),
    personaAvatarPreview: document.getElementById('personaAvatarPreview'),
    personaAvatarSvg: document.getElementById('personaAvatarSvg'),
    personaAvatarImg: document.getElementById('personaAvatarImg'),
    personaAvatarFileInput: document.getElementById('personaAvatarFileInput'),
    personaName: document.getElementById('personaName'),
    personaDescription: document.getElementById('personaDescription'),
    personaIsDefault: document.getElementById('personaIsDefault'),
    savePersonaBtn: document.getElementById('savePersonaBtn'),
    deletePersonaBtn: document.getElementById('deletePersonaBtn'),
    // 音乐相关元素
    musicSearchInput: document.getElementById('musicSearchInput'),
    musicSearchBtn: document.getElementById('musicSearchBtn'),
    musicSearchResults: document.getElementById('musicSearchResults'),
    musicFavoritesPage: document.getElementById('musicFavoritesPage'),
    favoritesList: document.getElementById('favoritesList'),
    showFavoritesBtn: document.getElementById('showFavoritesBtn'),
    createFavoritesBtn: document.getElementById('createFavoritesBtn'),
    musicPlayer: document.getElementById('musicPlayer'),
    playerAlbumArt: document.getElementById('playerAlbumArt'),
    playerSongName: document.getElementById('playerSongName'),
    playerArtist: document.getElementById('playerArtist'),
    playBtn: document.getElementById('playBtn'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    favoriteBtn: document.getElementById('favoriteBtn'),
    shareSongBtn: document.getElementById('shareSongBtn'),
    // 音乐气泡卡片元素
    musicBubble: document.getElementById('musicBubble'),
    musicBubbleCover: document.getElementById('musicBubbleCover'),
    musicBubbleName: document.getElementById('musicBubbleName'),
    musicBubbleArtist: document.getElementById('musicBubbleArtist'),
    bubblePlayBtn: document.getElementById('bubblePlayBtn'),
    bubblePrevBtn: document.getElementById('bubblePrevBtn'),
    bubbleNextBtn: document.getElementById('bubbleNextBtn'),
    bubbleFavBtn: document.getElementById('bubbleFavBtn'),
    conversationTitle: document.getElementById('conversationTitle'),
    messagesContainer: document.getElementById('messagesContainer'),
    messageInput: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendBtn'),
    plusBtn: document.getElementById('plusBtn'),
    plusMenu: document.getElementById('plusMenu'),
    headerAvatar: document.getElementById('headerAvatar'),
    deleteChatBtn: document.getElementById('deleteChatBtn'),
    editCharBtn: document.getElementById('editCharBtn'),
    worldbookList: document.getElementById('worldbookList'),
    worldbookEmpty: document.getElementById('worldbookEmpty'),
    addEntryBtn: document.getElementById('addEntryBtn'),
    entryEditTitle: document.getElementById('entryEditTitle'),
    entryName: document.getElementById('entryName'),
    entryKeywords: document.getElementById('entryKeywords'),
    entryContent: document.getElementById('entryContent'),
    saveEntryBtn: document.getElementById('saveEntryBtn'),
    deleteEntryBtn: document.getElementById('deleteEntryBtn'),
    apiUrl: document.getElementById('apiUrl'),
    apiKey: document.getElementById('apiKey'),
    modelName: document.getElementById('modelName'),
    systemPrompt: document.getElementById('systemPrompt'),
    temperature: document.getElementById('temperature'),
    maxTokens: document.getElementById('maxTokens'),
    toggleKeyBtn: document.getElementById('toggleKeyBtn'),
    testApiBtn: document.getElementById('testApiBtn'),
    testResult: document.getElementById('testResult'),
    clearAllDataBtn: document.getElementById('clearAllDataBtn'),
    calendarTitle: document.getElementById('calendarTitle'),
    calendarDays: document.getElementById('calendarDays'),
    prevMonth: document.getElementById('prevMonth'),
    nextMonth: document.getElementById('nextMonth')
};

// 初始化应用
function init() {
    loadData();
    loadMusicData();
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 1000);
    setupEventListeners();
    renderChatList();
    renderFriendsList();
    renderPersonaList();
    renderWorldbookList();
    loadSettings();
    renderCalendar();
    fetchWeather();
}

// 加载数据
function loadData() {
    try {
        const savedChats = localStorage.getItem('chats');
        if (savedChats) state.chats = JSON.parse(savedChats);

        const savedFriends = localStorage.getItem('friends');
        if (savedFriends) state.friends = JSON.parse(savedFriends);

        const savedPersonas = localStorage.getItem('personas');
        if (savedPersonas) state.personas = JSON.parse(savedPersonas);

        const savedWorldbook = localStorage.getItem('worldbook');
        if (savedWorldbook) state.worldbook = JSON.parse(savedWorldbook);

        const savedSettings = localStorage.getItem('settings');
        if (savedSettings) state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
    } catch (e) {
        console.error('Error loading data:', e);
    }
}

// 保存数据
function saveData() {
    try {
        localStorage.setItem('chats', JSON.stringify(state.chats));
        localStorage.setItem('friends', JSON.stringify(state.friends));
        localStorage.setItem('personas', JSON.stringify(state.personas));
        localStorage.setItem('worldbook', JSON.stringify(state.worldbook));
        localStorage.setItem('settings', JSON.stringify(state.settings));
    } catch (e) {
        console.error('Error saving data:', e);
    }
}

// 更新状态栏时间
function updateStatusBarTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    elements.statusTime.textContent = `${hours}:${minutes}`;
}

// 设置事件监听器
function setupEventListeners() {
    // 灵动岛点击事件
    elements.dynamicIsland.addEventListener('click', () => {
        elements.dynamicIsland.classList.toggle('expanded');
        setTimeout(() => {
            elements.dynamicIsland.classList.remove('expanded');
        }, 2000);
    });

    // 标签栏点击
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', () => navigateTo(tab.dataset.page));
    });

    // 应用图标点击
    document.querySelectorAll('.app-icon').forEach(icon => {
        icon.addEventListener('click', () => navigateTo(icon.dataset.page));
    });

    // 返回按钮
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 如果是角色编辑页面的返回按钮，根据来源页面返回
            if (btn.closest('#page-char-edit')) {
                const targetPage = state.previousPage || btn.dataset.page;
                if (targetPage === 'conversation' && state.currentChatId) {
                    openChat(state.currentChatId);
                } else {
                    navigateTo(btn.dataset.page);
                }
            } else {
                navigateTo(btn.dataset.page);
            }
        });
    });

    // 好友按钮
    elements.friendsBtn.addEventListener('click', () => navigateTo('friends'));

    // 新建聊天 - 显示选择好友弹窗
    elements.newChatBtn.addEventListener('click', showSelectFriendModal);

    // 添加好友
    elements.addFriendBtn.addEventListener('click', () => {
        state.currentFriendId = null;
        state.previousPage = 'friends'; // 记录来源页面
        elements.charEditTitle.textContent = '新建角色';
        elements.charName.value = '';
        elements.charPersona.value = '';
        elements.charGreeting.value = '';
        elements.charScenario.value = '';
        elements.charExample.value = '';
        elements.deleteCharBtn.style.display = 'none';
        state.selectedAvatarColor = '#007AFF';
        state.selectedAvatarImage = null;
        state.selectedChatBgImage = null;

        // 重置新功能状态
        populateWorldbookSelect();
        populatePersonaSelect();
        elements.charWorldbook.value = '';
        elements.charPersonaMask.value = 'global';
        elements.useCustomApi.checked = false;
        elements.customApiSettings.style.display = 'none';
        elements.charApiUrl.value = '';
        elements.charApiKey.value = '';
        elements.charModelName.value = '';
        elements.chatBgImg.style.display = 'none';
        elements.chatBgText.style.display = 'block';
        elements.clearBgBtn.style.display = 'none';
        elements.charMsgLimit.value = '0';

        updateAvatarPreview();
        navigateTo('char-edit');
    });

    // 保存角色
    elements.saveCharBtn.addEventListener('click', saveFriend);

    // 删除角色
    elements.deleteCharBtn.addEventListener('click', deleteFriend);

    // 头像点击上传图片
    elements.charAvatarPreview.addEventListener('click', () => {
        elements.avatarFileInput.click();
    });

    // 头像文件选择
    elements.avatarFileInput.addEventListener('change', handleAvatarUpload);

    // 自定义API开关
    elements.useCustomApi.addEventListener('change', () => {
        elements.customApiSettings.style.display = elements.useCustomApi.checked ? 'block' : 'none';
    });

    // 聊天背景点击上传
    elements.chatBgPreview.addEventListener('click', () => {
        elements.chatBgFileInput.click();
    });

    // 聊天背景文件选择
    elements.chatBgFileInput.addEventListener('change', handleChatBgUpload);

    // 清除聊天背景
    elements.clearBgBtn.addEventListener('click', () => {
        state.selectedChatBgImage = null;
        elements.chatBgImg.style.display = 'none';
        elements.chatBgText.style.display = 'block';
        elements.clearBgBtn.style.display = 'none';
    });

    // 清空聊天记录
    elements.clearChatHistoryBtn.addEventListener('click', clearChatHistory);

    // 头像颜色选择
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            state.selectedAvatarColor = option.dataset.color;
            state.selectedAvatarImage = null;
            updateAvatarPreview();
        });
    });

    // 发送消息
    elements.sendBtn.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // 自动调整输入框高度
    elements.messageInput.addEventListener('input', () => {
        // 隐藏更多功能菜单
        if (elements.plusMenu.style.display !== 'none') {
            elements.plusMenu.style.display = 'none';
            elements.plusBtn.style.transform = 'rotate(0deg)';
        }
    });

    // 删除聊天
    elements.deleteChatBtn.addEventListener('click', deleteCurrentChat);
    
    // 编辑角色按钮
    if (elements.editCharBtn) {
        elements.editCharBtn.addEventListener('click', editCurrentChatFriend);
    }

    // 加号按钮 - 显示/隐藏更多功能菜单
    if (elements.plusBtn) {
        elements.plusBtn.addEventListener('click', () => {
            const isVisible = elements.plusMenu.style.display !== 'none';
            elements.plusMenu.style.display = isVisible ? 'none' : 'block';
            // 旋转加号图标
            elements.plusBtn.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(45deg)';
        });
    }

    // 更多功能菜单项点击事件
    document.querySelectorAll('.plus-menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            
            // 音乐功能跳转到音乐app
            if (action === 'music') {
                navigateTo('music');
            } else {
                alert(`${item.querySelector('span').textContent}功能暂未开放`);
            }
            
            elements.plusMenu.style.display = 'none';
            elements.plusBtn.style.transform = 'rotate(0deg)';
        });
    });

    // 添加世界书条目
    elements.addEntryBtn.addEventListener('click', () => {
        state.currentEntryId = null;
        elements.entryEditTitle.textContent = '新建条目';
        elements.entryName.value = '';
        elements.entryKeywords.value = '';
        elements.entryContent.value = '';
        elements.deleteEntryBtn.style.display = 'none';
        navigateTo('worldbook-edit');
    });

    // 保存世界书条目
    elements.saveEntryBtn.addEventListener('click', saveWorldbookEntry);

    // 删除世界书条目
    elements.deleteEntryBtn.addEventListener('click', deleteWorldbookEntry);

    // 切换密钥可见性
    elements.toggleKeyBtn.addEventListener('click', toggleKeyVisibility);

    // 测试API连接
    elements.testApiBtn.addEventListener('click', testApiConnection);

    // 清除所有数据
    elements.clearAllDataBtn.addEventListener('click', clearAllData);

    // 面具相关事件
    elements.addPersonaBtn.addEventListener('click', () => {
        state.currentPersonaId = null;
        elements.personaEditTitle.textContent = '新建面具';
        elements.personaName.value = '';
        elements.personaDescription.value = '';
        elements.personaIsDefault.checked = false;
        elements.deletePersonaBtn.style.display = 'none';
        state.selectedPersonaAvatarImage = null;
        updatePersonaAvatarPreview();
        navigateTo('persona-edit');
    });

    elements.savePersonaBtn.addEventListener('click', savePersona);
    elements.deletePersonaBtn.addEventListener('click', deletePersona);

    // 面具头像点击上传
    elements.personaAvatarPreview.addEventListener('click', () => {
        elements.personaAvatarFileInput.click();
    });

    // 面具头像文件选择
    elements.personaAvatarFileInput.addEventListener('change', handlePersonaAvatarUpload);

    // 音乐相关事件
    if (elements.musicSearchBtn) {
        elements.musicSearchBtn.addEventListener('click', searchMusic);
    }
    if (elements.musicSearchInput) {
        elements.musicSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') searchMusic();
        });
    }
    if (elements.showFavoritesBtn) {
        elements.showFavoritesBtn.addEventListener('click', () => {
            elements.musicSearchResults.style.display = 'none';
            elements.musicFavoritesPage.style.display = 'block';
            renderFavorites();
        });
    }
    if (elements.createFavoritesBtn) {
        elements.createFavoritesBtn.addEventListener('click', createFavoritesFolder);
    }
    if (elements.playBtn) {
        elements.playBtn.addEventListener('click', togglePlay);
    }
    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', playPrev);
    }
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', playNext);
    }
    if (elements.favoriteBtn) {
        elements.favoriteBtn.addEventListener('click', toggleFavorite);
    }
    if (elements.shareSongBtn) {
        elements.shareSongBtn.addEventListener('click', shareSongToChat);
    }

    // 音乐气泡卡片事件
    if (elements.musicBubble) {
        elements.musicBubble.addEventListener('click', (e) => {
            // 如果点击的是控制按钮，不跳转到音乐页面
            if (e.target.closest('.music-bubble-btn')) return;
            navigateTo('music');
        });
    }
    if (elements.bubblePlayBtn) {
        elements.bubblePlayBtn.addEventListener('click', togglePlay);
    }
    if (elements.bubblePrevBtn) {
        elements.bubblePrevBtn.addEventListener('click', playPrev);
    }
    if (elements.bubbleNextBtn) {
        elements.bubbleNextBtn.addEventListener('click', playNext);
    }
    if (elements.bubbleFavBtn) {
        elements.bubbleFavBtn.addEventListener('click', toggleFavorite);
    }

    // 日历导航
    elements.prevMonth.addEventListener('click', () => {
        state.currentMonth.setMonth(state.currentMonth.getMonth() - 1);
        renderCalendar();
    });

    elements.nextMonth.addEventListener('click', () => {
        state.currentMonth.setMonth(state.currentMonth.getMonth() + 1);
        renderCalendar();
    });

    // 设置输入变化监听
    [elements.apiUrl, elements.apiKey, elements.modelName,
     elements.systemPrompt, elements.temperature, elements.maxTokens].forEach(el => {
        el.addEventListener('change', saveSettings);
    });
}

// 页面导航
function navigateTo(page) {
    state.currentPage = page;

    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // 显示目标页面
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 更新标签栏状态
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.page === page);
    });

    // 控制标签栏显示
    const hideTabBar = ['conversation', 'worldbook-edit', 'friends', 'char-edit', 'persona', 'persona-edit'].includes(page);
    elements.tabBar.style.display = hideTabBar ? 'none' : 'flex';

    // 进入聊天列表页面时刷新列表
    if (page === 'chat') {
        renderChatList();
    }
}

// 更新头像预览
function updateAvatarPreview() {
    if (state.selectedAvatarImage) {
        elements.avatarSvg.style.display = 'none';
        elements.avatarImg.style.display = 'block';
        elements.avatarImg.src = state.selectedAvatarImage;
    } else {
        elements.avatarSvg.style.display = 'block';
        elements.avatarImg.style.display = 'none';
        elements.charAvatarPreview.style.background = state.selectedAvatarColor;
    }
}

// 处理头像上传
function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        state.selectedAvatarImage = event.target.result;
        updateAvatarPreview();
    };
    reader.readAsDataURL(file);
}

// 处理聊天背景上传
function handleChatBgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        state.selectedChatBgImage = event.target.result;
        elements.chatBgImg.src = event.target.result;
        elements.chatBgImg.style.display = 'block';
        elements.chatBgText.style.display = 'none';
        elements.clearBgBtn.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// 清空聊天记录
function clearChatHistory() {
    const chat = state.chats.find(c => c.id === state.currentChatId);
    if (!chat) return;

    if (!confirm('确定要清空所有聊天记录吗？')) return;

    chat.messages = [];
    chat.updatedAt = Date.now();
    saveData();
    alert('聊天记录已清空');
}

// 填充世界书下拉列表
function populateWorldbookSelect() {
    elements.charWorldbook.innerHTML = '<option value="">无</option>';
    state.worldbook.forEach(entry => {
        const option = document.createElement('option');
        option.value = entry.id;
        option.textContent = entry.name;
        elements.charWorldbook.appendChild(option);
    });
}

// 渲染好友列表
function renderFriendsList() {
    if (state.friends.length === 0) {
        elements.friendsList.style.display = 'none';
        elements.friendsEmpty.style.display = 'flex';
        return;
    }

    elements.friendsList.style.display = 'block';
    elements.friendsEmpty.style.display = 'none';

    elements.friendsList.innerHTML = state.friends.map(friend => `
        <div class="friend-item" data-friend-id="${friend.id}">
            <div class="friend-avatar" style="background: ${friend.avatarColor || '#007AFF'}">
                <svg viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
            <div class="friend-info">
                <div class="friend-name">${escapeHtml(friend.name)}</div>
                <div class="friend-persona">${escapeHtml(friend.persona.substring(0, 50))}</div>
            </div>
            <div class="friend-actions">
                <button class="friend-action-btn edit-friend-btn" data-friend-id="${friend.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                </button>
                <button class="friend-action-btn chat-friend-btn" data-friend-id="${friend.id}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // 添加点击事件
    document.querySelectorAll('.edit-friend-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            state.previousPage = 'friends'; // 记录来源页面
            editFriend(btn.dataset.friendId);
        });
    });

    document.querySelectorAll('.chat-friend-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            createChatWithFriend(btn.dataset.friendId);
        });
    });
}

// 编辑好友
function editFriend(friendId) {
    const friend = state.friends.find(f => f.id === friendId);
    if (!friend) return;

    state.currentFriendId = friendId;
    elements.charEditTitle.textContent = '编辑角色';
    elements.charName.value = friend.name;
    elements.charPersona.value = friend.persona;
    elements.charGreeting.value = friend.greeting || '';
    elements.charScenario.value = friend.scenario || '';
    elements.charExample.value = friend.example || '';
    elements.deleteCharBtn.style.display = 'block';
    state.selectedAvatarColor = friend.avatarColor || '#007AFF';
    state.selectedAvatarImage = friend.avatarImage || null;
    state.selectedChatBgImage = friend.chatBgImage || null;

    // 更新颜色选择状态
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.toggle('selected', option.dataset.color === state.selectedAvatarColor);
    });

    // 填充世界书下拉列表
    populateWorldbookSelect();
    elements.charWorldbook.value = friend.worldbookId || '';

    // 填充面具下拉列表并更新用户面具
    populatePersonaSelect();
    elements.charPersonaMask.value = friend.personaMask || 'global';

    // 更新自定义API设置
    elements.useCustomApi.checked = friend.useCustomApi || false;
    elements.customApiSettings.style.display = friend.useCustomApi ? 'block' : 'none';
    elements.charApiUrl.value = friend.customApiUrl || '';
    elements.charApiKey.value = friend.customApiKey || '';
    elements.charModelName.value = friend.customModelName || '';

    // 更新聊天背景
    if (state.selectedChatBgImage) {
        elements.chatBgImg.src = state.selectedChatBgImage;
        elements.chatBgImg.style.display = 'block';
        elements.chatBgText.style.display = 'none';
        elements.clearBgBtn.style.display = 'block';
    } else {
        elements.chatBgImg.style.display = 'none';
        elements.chatBgText.style.display = 'block';
        elements.clearBgBtn.style.display = 'none';
    }

    // 更新消息限制
    elements.charMsgLimit.value = friend.msgLimit || '0';

    updateAvatarPreview();
    navigateTo('char-edit');
}

// 保存好友
function saveFriend() {
    const name = elements.charName.value.trim();
    const persona = elements.charPersona.value.trim();

    if (!name) {
        alert('请输入角色名称');
        return;
    }

    if (!persona) {
        alert('请输入角色人设');
        return;
    }

    const friendData = {
        name: name,
        persona: persona,
        greeting: elements.charGreeting.value.trim(),
        scenario: elements.charScenario.value.trim(),
        example: elements.charExample.value.trim(),
        avatarColor: state.selectedAvatarColor,
        avatarImage: state.selectedAvatarImage,
        worldbookId: elements.charWorldbook.value,
        personaMask: elements.charPersonaMask.value,
        useCustomApi: elements.useCustomApi.checked,
        customApiUrl: elements.charApiUrl.value.trim(),
        customApiKey: elements.charApiKey.value.trim(),
        customModelName: elements.charModelName.value.trim(),
        chatBgImage: state.selectedChatBgImage,
        msgLimit: elements.charMsgLimit.value
    };

    if (state.currentFriendId) {
        // 更新现有好友
        const friend = state.friends.find(f => f.id === state.currentFriendId);
        if (friend) {
            Object.assign(friend, friendData);
        }
    } else {
        // 创建新好友
        state.friends.push({
            id: 'friend_' + Date.now(),
            ...friendData,
            createdAt: Date.now()
        });
    }

    saveData();
    renderFriendsList();
    
    // 根据来源页面返回
    const targetPage = state.previousPage || 'friends';
    if (targetPage === 'conversation' && state.currentChatId) {
        openChat(state.currentChatId);
    } else {
        navigateTo('friends');
    }
}

// 删除好友
function deleteFriend() {
    if (!confirm('确定要删除这个角色吗？')) return;

    state.friends = state.friends.filter(f => f.id !== state.currentFriendId);
    state.currentFriendId = null;
    saveData();
    renderFriendsList();
    navigateTo('friends');
}

// 渲染面具列表
function renderPersonaList() {
    if (state.personas.length === 0) {
        elements.personaList.style.display = 'none';
        elements.personaEmpty.style.display = 'flex';
        return;
    }

    elements.personaList.style.display = 'block';
    elements.personaEmpty.style.display = 'none';

    elements.personaList.innerHTML = state.personas.map(persona => `
        <div class="persona-item" data-persona-id="${persona.id}">
            <div class="persona-item-avatar">
                ${persona.avatarImage 
                    ? `<img src="${persona.avatarImage}" alt="${persona.name}">`
                    : `<svg viewBox="0 0 24 24">
                         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                       </svg>`
                }
            </div>
            <div class="persona-item-info">
                <div class="persona-item-name">${escapeHtml(persona.name)}</div>
                <div class="persona-item-desc">${escapeHtml(persona.description.substring(0, 50))}</div>
                ${persona.isDefault ? '<div class="persona-item-badge">全局默认</div>' : ''}
            </div>
        </div>
    `).join('');

    // 添加点击事件
    document.querySelectorAll('.persona-item').forEach(item => {
        item.addEventListener('click', () => editPersona(item.dataset.personaId));
    });
}

// 编辑面具
function editPersona(personaId) {
    const persona = state.personas.find(p => p.id === personaId);
    if (!persona) return;

    state.currentPersonaId = personaId;
    elements.personaEditTitle.textContent = '编辑面具';
    elements.personaName.value = persona.name;
    elements.personaDescription.value = persona.description;
    elements.personaIsDefault.checked = persona.isDefault || false;
    elements.deletePersonaBtn.style.display = 'block';
    state.selectedPersonaAvatarImage = persona.avatarImage || null;
    updatePersonaAvatarPreview();

    navigateTo('persona-edit');
}

// 更新面具头像预览
function updatePersonaAvatarPreview() {
    if (state.selectedPersonaAvatarImage) {
        elements.personaAvatarSvg.style.display = 'none';
        elements.personaAvatarImg.style.display = 'block';
        elements.personaAvatarImg.src = state.selectedPersonaAvatarImage;
    } else {
        elements.personaAvatarSvg.style.display = 'block';
        elements.personaAvatarImg.style.display = 'none';
    }
}

// 处理面具头像上传
function handlePersonaAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        state.selectedPersonaAvatarImage = event.target.result;
        updatePersonaAvatarPreview();
    };
    reader.readAsDataURL(file);
}

// 保存面具
function savePersona() {
    const name = elements.personaName.value.trim();
    const description = elements.personaDescription.value.trim();

    if (!name) {
        alert('请输入面具名称');
        return;
    }

    // 如果设为全局默认，取消其他面具的默认状态
    if (elements.personaIsDefault.checked) {
        state.personas.forEach(p => {
            p.isDefault = false;
        });
    }

    const personaData = {
        name: name,
        description: description,
        avatarImage: state.selectedPersonaAvatarImage,
        isDefault: elements.personaIsDefault.checked
    };

    if (state.currentPersonaId) {
        // 更新现有面具
        const persona = state.personas.find(p => p.id === state.currentPersonaId);
        if (persona) {
            Object.assign(persona, personaData);
        }
    } else {
        // 创建新面具
        state.personas.push({
            id: 'persona_' + Date.now(),
            ...personaData,
            createdAt: Date.now()
        });
    }

    saveData();
    renderPersonaList();
    populatePersonaSelect();
    navigateTo('persona');
}

// 删除面具
function deletePersona() {
    if (!confirm('确定要删除这个面具吗？')) return;

    state.personas = state.personas.filter(p => p.id !== state.currentPersonaId);
    state.currentPersonaId = null;
    saveData();
    renderPersonaList();
    populatePersonaSelect();
    navigateTo('persona');
}

// 填充面具下拉列表
function populatePersonaSelect() {
    elements.charPersonaMask.innerHTML = '<option value="global">全局默认</option>';
    state.personas.forEach(persona => {
        const option = document.createElement('option');
        option.value = persona.id;
        option.textContent = persona.name;
        elements.charPersonaMask.appendChild(option);
    });
}

// 显示选择好友弹窗
function showSelectFriendModal() {
    if (state.friends.length === 0) {
        // 如果没有好友，直接创建普通聊天
        createNewChat();
        return;
    }

    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>选择角色</h2>
                <button class="modal-close-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="modal-friend-item" data-friend-id="">
                    <div class="modal-friend-avatar" style="background: #8E8E93">
                        <svg viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                        </svg>
                    </div>
                    <div class="modal-friend-name">普通对话</div>
                </div>
                ${state.friends.map(friend => `
                    <div class="modal-friend-item" data-friend-id="${friend.id}">
                        <div class="modal-friend-avatar" style="background: ${friend.avatarColor || '#007AFF'}">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                        </div>
                        <div class="modal-friend-name">${escapeHtml(friend.name)}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 关闭弹窗
    modal.querySelector('.modal-close-btn').addEventListener('click', () => {
        modal.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // 选择好友
    modal.querySelectorAll('.modal-friend-item').forEach(item => {
        item.addEventListener('click', () => {
            const friendId = item.dataset.friendId;
            modal.remove();
            if (friendId) {
                createChatWithFriend(friendId);
            } else {
                createNewChat();
            }
        });
    });
}

// 与好友创建聊天
function createChatWithFriend(friendId) {
    const friend = state.friends.find(f => f.id === friendId);
    if (!friend) return;

    const chat = {
        id: 'chat_' + Date.now(),
        title: friend.name,
        friendId: friendId,
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    // 如果有开场白，添加为第一条消息
    if (friend.greeting) {
        chat.messages.push({
            role: 'assistant',
            content: friend.greeting,
            timestamp: Date.now()
        });
    }

    state.chats.unshift(chat);
    saveData();
    openChat(chat.id);
}

// 渲染聊天列表
function renderChatList() {
    if (state.chats.length === 0) {
        elements.chatList.style.display = 'none';
        elements.chatEmpty.style.display = 'flex';
        return;
    }

    elements.chatList.style.display = 'block';
    elements.chatEmpty.style.display = 'none';

    elements.chatList.innerHTML = state.chats.map(chat => {
        const lastMessage = chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1].content.substring(0, 50)
            : '暂无消息';

        const time = chat.updatedAt ? formatTime(new Date(chat.updatedAt)) : '';

        // 获取好友头像信息
        const friend = chat.friendId ? state.friends.find(f => f.id === chat.friendId) : null;
        const avatarColor = friend ? (friend.avatarColor || '#007AFF') : '#007AFF';
        const avatarImage = friend ? friend.avatarImage : null;

        // 生成头像HTML
        let avatarHtml;
        if (avatarImage) {
            avatarHtml = `<img src="${avatarImage}" style="width:100%; height:100%; object-fit:cover;">`;
        } else {
            avatarHtml = `<svg viewBox="0 0 24 24">
                ${friend ? '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>' : '<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>'}
            </svg>`;
        }

        return `
            <div class="chat-item" data-chat-id="${chat.id}">
                <div class="chat-avatar" style="background: ${avatarColor}; overflow:hidden;">
                    ${avatarHtml}
                </div>
                <div class="chat-info">
                    <div class="chat-title">${escapeHtml(chat.title)}</div>
                    <div class="chat-preview">${escapeHtml(lastMessage)}</div>
                </div>
                <div class="chat-time">${time}</div>
            </div>
        `;
    }).join('');

    // 添加点击事件
    document.querySelectorAll('.chat-item').forEach(item => {
        item.addEventListener('click', () => openChat(item.dataset.chatId));
    });
}

// 格式化时间
function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return date.getHours().toString().padStart(2, '0') + ':' +
               date.getMinutes().toString().padStart(2, '0');
    } else if (days === 1) {
        return '昨天';
    } else if (days < 7) {
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];
    } else {
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 创建新聊天
function createNewChat() {
    const chat = {
        id: 'chat_' + Date.now(),
        title: '新对话',
        friendId: null,
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    state.chats.unshift(chat);
    saveData();
    openChat(chat.id);
}

// 打开聊天
function openChat(chatId) {
    state.currentChatId = chatId;
    const chat = state.chats.find(c => c.id === chatId);

    if (!chat) return;

    elements.conversationTitle.textContent = chat.title;
    renderMessages();
    navigateTo('conversation');

    // 滚动到底部
    setTimeout(() => {
        elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
    }, 100);
}

// 渲染消息
function renderMessages() {
    const chat = state.chats.find(c => c.id === state.currentChatId);
    if (!chat) return;

    // 获取好友信息
    const friend = chat.friendId ? state.friends.find(f => f.id === chat.friendId) : null;
    const avatarColor = friend ? (friend.avatarColor || '#5856D6') : '#5856D6';
    const avatarImage = friend ? friend.avatarImage : null;

    // 更新头部头像
    if (elements.headerAvatar) {
        if (avatarImage) {
            elements.headerAvatar.innerHTML = `<img src="${avatarImage}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
            elements.headerAvatar.style.background = 'none';
        } else {
            elements.headerAvatar.innerHTML = `
                <svg viewBox="0 0 24 24" fill="white">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            `;
            elements.headerAvatar.style.background = `linear-gradient(135deg, ${avatarColor}, ${adjustColor(avatarColor, 30)})`;
        }
    }

    // 应用聊天背景
    const chatBgImage = friend ? friend.chatBgImage : null;
    if (chatBgImage) {
        elements.messagesContainer.style.backgroundImage = `url(${chatBgImage})`;
        elements.messagesContainer.style.backgroundSize = 'cover';
        elements.messagesContainer.style.backgroundPosition = 'center';
    } else {
        elements.messagesContainer.style.backgroundImage = 'none';
        elements.messagesContainer.style.background = '#FFFFFF';
    }

    if (chat.messages.length === 0) {
        elements.messagesContainer.innerHTML = `
            <div class="chat-empty" style="flex:1">
                <p style="color: #8E8E93; font-size: 14px;">无历史记录</p>
            </div>
        `;
        return;
    }

    let html = '';
    let lastTime = 0;

    chat.messages.forEach((msg, index) => {
        const msgTime = msg.timestamp || Date.now();
        
        // 超过5分钟显示时间分割线
        if (msgTime - lastTime > 5 * 60 * 1000) {
            html += `<div class="message-time-divider"><span>${formatMessageTime(new Date(msgTime))}</span></div>`;
        }
        lastTime = msgTime;

        if (msg.role === 'user') {
            html += `
                <div class="message user">
                    <div class="message-bubble">${formatMessageContent(msg.content)}</div>
                </div>
            `;
        } else {
            const avatarHtml = avatarImage 
                ? `<div class="message-avatar"><img src="${avatarImage}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;"></div>`
                : `<div class="message-avatar" style="background: ${avatarColor}">
                     <svg viewBox="0 0 24 24">
                         <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                     </svg>
                   </div>`;
            
            html += `
                <div class="message assistant">
                    ${avatarHtml}
                    <div class="message-bubble">${formatMessageContent(msg.content)}</div>
                </div>
            `;
        }
    });

    elements.messagesContainer.innerHTML = html;

    // 滚动到底部
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

// 调整颜色亮度
function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

// 格式化消息时间
function formatMessageTime(date) {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    if (isToday) {
        return `${hours}:${minutes}`;
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return `昨天 ${hours}:${minutes}`;
    }
    
    return `${date.getMonth() + 1}月${date.getDate()}日 ${hours}:${minutes}`;
}

// 格式化消息内容
function formatMessageContent(content) {
    let html = escapeHtml(content);

    // 代码块
    html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // 行内代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // 粗体
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // 斜体
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // 换行
    html = html.replace(/\n/g, '<br>');

    return html;
}

// 发送消息
async function sendMessage() {
    const content = elements.messageInput.value.trim();
    if (!content) return;

    const chat = state.chats.find(c => c.id === state.currentChatId);
    if (!chat) return;

    // 添加用户消息
    chat.messages.push({
        role: 'user',
        content: content,
        timestamp: Date.now()
    });

    // 更新聊天标题（如果是第一条消息且没有好友）
    if (chat.messages.length === 1 && !chat.friendId) {
        chat.title = content.substring(0, 20) + (content.length > 20 ? '...' : '');
        elements.conversationTitle.textContent = chat.title;
    }

    chat.updatedAt = Date.now();
    elements.messageInput.value = '';
    
    // 隐藏更多功能菜单
    elements.plusMenu.style.display = 'none';
    elements.plusBtn.style.transform = 'rotate(0deg)';
    
    renderMessages();

    // 发送到API
    await callAI(content);
}

// 调用AI API
async function callAI(userMessage) {
    const chat = state.chats.find(c => c.id === state.currentChatId);
    if (!chat) return;

    // 获取好友信息
    const friend = chat.friendId ? state.friends.find(f => f.id === chat.friendId) : null;

    // 确定使用的API配置
    let apiUrl, apiKey, modelName;
    if (friend && friend.useCustomApi && friend.customApiUrl && friend.customApiKey) {
        apiUrl = friend.customApiUrl;
        apiKey = friend.customApiKey;
        modelName = friend.customModelName || state.settings.modelName;
    } else {
        apiUrl = state.settings.apiUrl;
        apiKey = state.settings.apiKey;
        modelName = state.settings.modelName;
    }

    if (!apiUrl || !apiKey) {
        addSystemMessage('请先在设置中配置API URL和Key，或在角色中配置自定义API');
        return;
    }

    // 显示加载状态
    const loadingId = showTypingIndicator();

    try {
        // 获取面具信息
        let personaInfo = null;
        if (friend && friend.personaMask && friend.personaMask !== 'global') {
            personaInfo = state.personas.find(p => p.id === friend.personaMask);
        } else {
            // 使用全局默认面具
            personaInfo = state.personas.find(p => p.isDefault);
        }

        // 构建系统提示词
        let systemPrompt = state.settings.systemPrompt;

        // 添加面具信息到系统提示词
        if (personaInfo) {
            systemPrompt += `\n\n用户人设（面具）：\n名称：${personaInfo.name}\n描述：${personaInfo.description}`;
        }

        if (friend) {
            // 使用角色设定构建系统提示词
            systemPrompt += `

你现在要扮演以下角色与用户对话。请始终保持角色设定，用角色的口吻和风格回复。

角色名称：${friend.name}

角色人设：
${friend.persona}

${friend.scenario ? `场景描述：\n${friend.scenario}\n` : ''}
${friend.example ? `示例对话：\n${friend.example}\n` : ''}

请完全融入这个角色，用角色的说话方式回复，不要跳出角色。`;
        }

        // 构建消息列表
        const messages = [
            { role: 'system', content: systemPrompt },
            ...chat.messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }))
        ];

        // 添加世界书内容（使用角色绑定的世界书或默认世界书）
        const worldbookId = friend ? friend.worldbookId : null;
        const worldbookContext = getWorldbookContext(userMessage, worldbookId);
        if (worldbookContext) {
            messages.splice(1, 0, { role: 'system', content: worldbookContext });
        }

        const response = await fetch(apiUrl + '/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelName,
                messages: messages,
                temperature: parseFloat(state.settings.temperature),
                max_tokens: parseInt(state.settings.maxTokens)
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error?.message || `API请求失败: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        // 移除加载状态
        removeTypingIndicator(loadingId);

        // 处理AI回复：去掉括号动作描写，分割成多句话
        const cleanedMessage = assistantMessage.replace(/[（(][^）)]*[）)]/g, '').trim();
        const sentences = splitIntoSentences(cleanedMessage);

        // 逐句添加到聊天中
        for (let i = 0; i < sentences.length; i++) {
            const sentence = sentences[i].trim();
            if (!sentence) continue;

            chat.messages.push({
                role: 'assistant',
                content: sentence,
                timestamp: Date.now() + i // 确保时间戳递增
            });

            // 应用消息限制
            applyMessageLimit(chat, friend);

            chat.updatedAt = Date.now();
            saveData();
            renderMessages();

            // 如果还有下一句，添加延迟模拟打字效果
            if (i < sentences.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
            }
        }

    } catch (error) {
        removeTypingIndicator(loadingId);
        addSystemMessage(`错误: ${error.message}`);
    }
}

// 将文本分割成多句话
function splitIntoSentences(text) {
    // 按换行符、句号、问号、感叹号分割
    const sentences = text.split(/[\n。！？!?]+/).filter(s => s.trim());
    
    // 如果只有一句话，直接返回
    if (sentences.length <= 1) {
        return [text];
    }
    
    return sentences;
}

// 应用消息限制
function applyMessageLimit(chat, friend) {
    if (!friend) return;
    
    const msgLimit = parseInt(friend.msgLimit) || 0;
    if (msgLimit > 0 && chat.messages.length > msgLimit) {
        // 保留最新的msgLimit条消息
        chat.messages = chat.messages.slice(-msgLimit);
    }
}

// 显示打字指示器
function showTypingIndicator() {
    const id = 'typing_' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = id;
    typingDiv.className = 'message assistant';

    const chat = state.chats.find(c => c.id === state.currentChatId);
    const friend = chat?.friendId ? state.friends.find(f => f.id === chat.friendId) : null;
    const avatarColor = friend ? (friend.avatarColor || '#5856D6') : '#5856D6';
    const avatarImage = friend ? friend.avatarImage : null;

    const avatarHtml = avatarImage 
        ? `<div class="message-avatar"><img src="${avatarImage}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;"></div>`
        : `<div class="message-avatar" style="background: ${avatarColor}">
             <svg viewBox="0 0 24 24">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
             </svg>
           </div>`;

    typingDiv.innerHTML = `
        ${avatarHtml}
        <div class="message-bubble">
            <div class="message-typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    elements.messagesContainer.appendChild(typingDiv);
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
    return id;
}

// 移除打字指示器
function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}

// 添加系统消息
function addSystemMessage(content) {
    const chat = state.chats.find(c => c.id === state.currentChatId);
    if (!chat) return;

    chat.messages.push({
        role: 'assistant',
        content: content,
        timestamp: Date.now()
    });

    chat.updatedAt = Date.now();
    saveData();
    renderMessages();
}

// 获取世界书上下文
function getWorldbookContext(message, worldbookId) {
    if (state.worldbook.length === 0) return null;

    // 如果指定了世界书ID，只搜索该世界书
    let entriesToSearch = state.worldbook;
    if (worldbookId) {
        const specificEntry = state.worldbook.find(e => e.id === worldbookId);
        if (specificEntry) {
            entriesToSearch = [specificEntry];
        } else {
            return null;
        }
    }

    const matchedEntries = entriesToSearch.filter(entry => {
        const keywords = entry.keywords.split('\n').filter(k => k.trim());
        return keywords.some(keyword =>
            message.toLowerCase().includes(keyword.trim().toLowerCase())
        );
    });

    if (matchedEntries.length === 0) return null;

    return '以下是相关的背景信息：\n\n' +
        matchedEntries.map(entry => `【${entry.name}】\n${entry.content}`).join('\n\n');
}

// 删除当前聊天
function deleteCurrentChat() {
    if (!confirm('确定要删除这个对话吗？')) return;

    state.chats = state.chats.filter(c => c.id !== state.currentChatId);
    state.currentChatId = null;
    saveData();
    renderChatList();
    navigateTo('chat');
}

// 编辑当前聊天关联的角色
function editCurrentChatFriend() {
    const chat = state.chats.find(c => c.id === state.currentChatId);
    if (!chat) return;

    if (!chat.friendId) {
        alert('当前对话未关联角色，请先关联角色');
        return;
    }

    state.previousPage = 'conversation'; // 记录来源页面
    editFriend(chat.friendId);
}

// 渲染世界书列表
function renderWorldbookList() {
    if (state.worldbook.length === 0) {
        elements.worldbookList.style.display = 'none';
        elements.worldbookEmpty.style.display = 'flex';
        return;
    }

    elements.worldbookList.style.display = 'block';
    elements.worldbookEmpty.style.display = 'none';

    elements.worldbookList.innerHTML = state.worldbook.map(entry => `
        <div class="worldbook-item" data-entry-id="${entry.id}">
            <div class="worldbook-item-title">${escapeHtml(entry.name)}</div>
            <div class="worldbook-item-keywords">关键词: ${escapeHtml(entry.keywords.split('\n').filter(k => k.trim()).join(', ') || '无')}</div>
            <div class="worldbook-item-preview">${escapeHtml(entry.content.substring(0, 100))}</div>
        </div>
    `).join('');

    // 添加点击事件
    document.querySelectorAll('.worldbook-item').forEach(item => {
        item.addEventListener('click', () => editWorldbookEntry(item.dataset.entryId));
    });
}

// 编辑世界书条目
function editWorldbookEntry(entryId) {
    const entry = state.worldbook.find(e => e.id === entryId);
    if (!entry) return;

    state.currentEntryId = entryId;
    elements.entryEditTitle.textContent = '编辑条目';
    elements.entryName.value = entry.name;
    elements.entryKeywords.value = entry.keywords;
    elements.entryContent.value = entry.content;
    elements.deleteEntryBtn.style.display = 'block';
    navigateTo('worldbook-edit');
}

// 保存世界书条目
function saveWorldbookEntry() {
    const name = elements.entryName.value.trim();
    const keywords = elements.entryKeywords.value;
    const content = elements.entryContent.value.trim();

    if (!name) {
        alert('请输入条目名称');
        return;
    }

    if (!content) {
        alert('请输入条目内容');
        return;
    }

    if (state.currentEntryId) {
        // 更新现有条目
        const entry = state.worldbook.find(e => e.id === state.currentEntryId);
        if (entry) {
            entry.name = name;
            entry.keywords = keywords;
            entry.content = content;
        }
    } else {
        // 创建新条目
        state.worldbook.push({
            id: 'entry_' + Date.now(),
            name: name,
            keywords: keywords,
            content: content,
            createdAt: Date.now()
        });
    }

    saveData();
    renderWorldbookList();
    navigateTo('worldbook');
}

// 删除世界书条目
function deleteWorldbookEntry() {
    if (!confirm('确定要删除这个条目吗？')) return;

    state.worldbook = state.worldbook.filter(e => e.id !== state.currentEntryId);
    state.currentEntryId = null;
    saveData();
    renderWorldbookList();
    navigateTo('worldbook');
}

// 加载设置
function loadSettings() {
    elements.apiUrl.value = state.settings.apiUrl;
    elements.apiKey.value = state.settings.apiKey;
    elements.modelName.value = state.settings.modelName;
    elements.systemPrompt.value = state.settings.systemPrompt;
    elements.temperature.value = state.settings.temperature;
    elements.maxTokens.value = state.settings.maxTokens;
}

// 保存设置
function saveSettings() {
    state.settings = {
        apiUrl: elements.apiUrl.value.trim(),
        apiKey: elements.apiKey.value.trim(),
        modelName: elements.modelName.value.trim() || 'gpt-3.5-turbo',
        systemPrompt: elements.systemPrompt.value,
        temperature: parseFloat(elements.temperature.value) || 0.7,
        maxTokens: parseInt(elements.maxTokens.value) || 2048
    };
    saveData();
}

// 切换密钥可见性
function toggleKeyVisibility() {
    const type = elements.apiKey.type === 'password' ? 'text' : 'password';
    elements.apiKey.type = type;
}

// 测试API连接
async function testApiConnection() {
    const url = elements.apiUrl.value.trim();
    const key = elements.apiKey.value.trim();

    if (!url || !key) {
        elements.testResult.textContent = '请先填写API URL和Key';
        elements.testResult.className = 'test-result error';
        return;
    }

    elements.testApiBtn.disabled = true;
    elements.testApiBtn.textContent = '测试中...';
    elements.testResult.style.display = 'none';

    try {
        const response = await fetch(url + '/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
                model: elements.modelName.value || 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: 'Hello' }],
                max_tokens: 5
            })
        });

        if (response.ok) {
            elements.testResult.textContent = '连接成功！';
            elements.testResult.className = 'test-result success';
        } else {
            const data = await response.json().catch(() => null);
            elements.testResult.textContent = data?.error?.message || `请求失败: ${response.status}`;
            elements.testResult.className = 'test-result error';
        }
    } catch (error) {
        elements.testResult.textContent = `连接失败: ${error.message}`;
        elements.testResult.className = 'test-result error';
    } finally {
        elements.testApiBtn.disabled = false;
        elements.testApiBtn.textContent = '测试连接';
    }
}

// 清除所有数据
function clearAllData() {
    if (!confirm('确定要清除所有数据吗？此操作不可恢复。')) return;

    state.chats = [];
    state.friends = [];
    state.personas = [];
    state.worldbook = [];
    state.currentChatId = null;
    state.currentFriendId = null;
    state.currentPersonaId = null;
    state.currentEntryId = null;

    localStorage.removeItem('chats');
    localStorage.removeItem('friends');
    localStorage.removeItem('personas');
    localStorage.removeItem('worldbook');

    renderChatList();
    renderFriendsList();
    renderPersonaList();
    renderWorldbookList();

    alert('数据已清除');
}

// 渲染日历
function renderCalendar() {
    const year = state.currentMonth.getFullYear();
    const month = state.currentMonth.getMonth();

    // 更新标题
    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
                        '七月', '八月', '九月', '十月', '十一月', '十二月'];
    elements.calendarTitle.textContent = `${year}年 ${monthNames[month]}`;

    // 获取本月第一天是星期几
    const firstDay = new Date(year, month, 1).getDay();

    // 获取本月有多少天
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 今天的日期
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    let html = '';

    // 上个月的日期
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
    }

    // 本月的日期
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = isCurrentMonth && today.getDate() === day;
        html += `<div class="calendar-day ${isToday ? 'today' : ''}">${day}</div>`;
    }

    // 下个月的日期
    const totalCells = firstDay + daysInMonth;
    const remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingCells; i++) {
        html += `<div class="calendar-day other-month">${i}</div>`;
    }

    elements.calendarDays.innerHTML = html;
}

// ==================== 音乐功能 ====================

// 搜索音乐（使用模拟数据）
async function searchMusic() {
    const query = elements.musicSearchInput.value.trim();
    if (!query) return;

    // 显示加载状态
    elements.musicSearchResults.innerHTML = `
        <div class="music-empty">
            <p>搜索中...</p>
        </div>
    `;

    // 模拟搜索结果（实际项目中需要接入音乐API）
    setTimeout(() => {
        const mockResults = generateMockResults(query);
        renderMusicResults(mockResults);
    }, 500);
}

// 生成模拟搜索结果
function generateMockResults(query) {
    const songs = [
        { id: '1', name: `${query} - 热门版`, artist: '歌手A', cover: '', duration: '3:45' },
        { id: '2', name: `${query} (Live)`, artist: '歌手B', cover: '', duration: '4:12' },
        { id: '3', name: `关于${query}的歌`, artist: '歌手C', cover: '', duration: '3:28' },
        { id: '4', name: `${query}回忆`, artist: '歌手D', cover: '', duration: '5:01' },
        { id: '5', name: `${query}的季节`, artist: '歌手E', cover: '', duration: '3:56' },
    ];
    return songs;
}

// 渲染音乐搜索结果
function renderMusicResults(songs) {
    state.musicState.playlist = songs;
    
    elements.musicSearchResults.innerHTML = songs.map(song => `
        <div class="music-item" data-song-id="${song.id}">
            <div class="music-item-cover">
                ${song.cover ? `<img src="${song.cover}" alt="">` : `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#8E8E93">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                </svg>`}
            </div>
            <div class="music-item-info">
                <div class="music-item-name">${escapeHtml(song.name)}</div>
                <div class="music-item-artist">${escapeHtml(song.artist)}</div>
            </div>
            <div class="music-item-actions">
                <button class="music-item-btn play-song-btn" data-song-id="${song.id}" title="播放">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#007AFF">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </button>
                <button class="music-item-btn add-fav-btn" data-song-id="${song.id}" title="收藏">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    // 添加事件监听器
    document.querySelectorAll('.play-song-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            playSong(btn.dataset.songId);
        });
    });

    document.querySelectorAll('.add-fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToFavorites(btn.dataset.songId);
        });
    });

    document.querySelectorAll('.music-item').forEach(item => {
        item.addEventListener('click', () => {
            playSong(item.dataset.songId);
        });
    });
}

// 播放歌曲
function playSong(songId) {
    const song = state.musicState.playlist.find(s => s.id === songId);
    if (!song) return;

    state.musicState.currentSong = song;
    state.musicState.isPlaying = true;

    // 更新播放器UI
    elements.musicPlayer.style.display = 'block';
    elements.playerSongName.textContent = song.name;
    elements.playerArtist.textContent = song.artist;
    
    // 更新播放按钮
    elements.playBtn.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
    `;

    // 更新收藏按钮状态
    updateFavoriteButton();
    
    // 更新音乐气泡卡片
    updateMusicBubble();
}

// 切换播放/暂停
function togglePlay() {
    if (!state.musicState.currentSong) return;

    state.musicState.isPlaying = !state.musicState.isPlaying;

    if (state.musicState.isPlaying) {
        elements.playBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        `;
    } else {
        elements.playBtn.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
    }
    
    // 更新音乐气泡卡片
    updateMusicBubble();
}

// 上一首
function playPrev() {
    if (!state.musicState.currentSong || state.musicState.playlist.length === 0) return;
    
    const currentIndex = state.musicState.playlist.findIndex(s => s.id === state.musicState.currentSong.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : state.musicState.playlist.length - 1;
    playSong(state.musicState.playlist[prevIndex].id);
}

// 下一首
function playNext() {
    if (!state.musicState.currentSong || state.musicState.playlist.length === 0) return;
    
    const currentIndex = state.musicState.playlist.findIndex(s => s.id === state.musicState.currentSong.id);
    const nextIndex = currentIndex < state.musicState.playlist.length - 1 ? currentIndex + 1 : 0;
    playSong(state.musicState.playlist[nextIndex].id);
}

// 切换收藏状态
function toggleFavorite() {
    if (!state.musicState.currentSong) return;
    
    addToFavorites(state.musicState.currentSong.id);
    updateFavoriteButton();
    updateMusicBubble();
}

// 更新音乐气泡卡片
function updateMusicBubble() {
    if (!state.musicState.currentSong) {
        if (elements.musicBubble) {
            elements.musicBubble.style.display = 'none';
        }
        return;
    }

    if (elements.musicBubble) {
        elements.musicBubble.style.display = 'flex';
    }
    
    if (elements.musicBubbleName) {
        elements.musicBubbleName.textContent = state.musicState.currentSong.name;
    }
    if (elements.musicBubbleArtist) {
        elements.musicBubbleArtist.textContent = state.musicState.currentSong.artist;
    }
    
    // 更新播放按钮
    if (elements.bubblePlayBtn) {
        if (state.musicState.isPlaying) {
            elements.bubblePlayBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#636366">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            `;
        } else {
            elements.bubblePlayBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#636366">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            `;
        }
    }
}

// 更新收藏按钮状态
function updateFavoriteButton() {
    if (!state.musicState.currentSong) return;
    
    const isFavorited = state.musicState.favorites.some(folder => 
        folder.songs.some(s => s.id === state.musicState.currentSong.id)
    );
    
    if (isFavorited) {
        elements.favoriteBtn.classList.add('active');
        elements.favoriteBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF2D55" stroke="#FF2D55" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        `;
    } else {
        elements.favoriteBtn.classList.remove('active');
        elements.favoriteBtn.innerHTML = `
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        `;
    }
}

// 添加到收藏夹
function addToFavorites(songId) {
    const song = state.musicState.playlist.find(s => s.id === songId);
    if (!song) return;

    // 如果没有收藏夹，创建默认收藏夹
    if (state.musicState.favorites.length === 0) {
        state.musicState.favorites.push({
            id: 'default',
            name: '我的收藏',
            songs: []
        });
    }

    // 添加到第一个收藏夹
    const folder = state.musicState.favorites[0];
    const existingIndex = folder.songs.findIndex(s => s.id === songId);
    
    if (existingIndex >= 0) {
        // 已收藏则移除
        folder.songs.splice(existingIndex, 1);
    } else {
        // 未收藏则添加
        folder.songs.push(song);
    }

    saveMusicData();
}

// 创建收藏夹
function createFavoritesFolder() {
    const name = prompt('请输入收藏夹名称：');
    if (!name) return;

    state.musicState.favorites.push({
        id: 'folder_' + Date.now(),
        name: name,
        songs: []
    });

    saveMusicData();
    renderFavorites();
}

// 渲染收藏夹
function renderFavorites() {
    if (state.musicState.favorites.length === 0) {
        elements.favoritesList.innerHTML = `
            <div class="music-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#8E8E93">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <p>暂无收藏</p>
            </div>
        `;
        return;
    }

    elements.favoritesList.innerHTML = state.musicState.favorites.map(folder => `
        <div class="favorite-folder" data-folder-id="${folder.id}">
            <div class="favorite-folder-header">
                <div class="favorite-folder-name">${escapeHtml(folder.name)}</div>
                <div class="favorite-folder-count">${folder.songs.length}首</div>
            </div>
            ${folder.songs.slice(0, 3).map(song => `
                <div class="favorite-song" data-song-id="${song.id}">
                    <div class="favorite-song-cover">
                        ${song.cover ? `<img src="${song.cover}" alt="">` : `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#8E8E93">
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>`}
                    </div>
                    <div class="favorite-song-info">
                        <div class="favorite-song-name">${escapeHtml(song.name)}</div>
                        <div class="favorite-song-artist">${escapeHtml(song.artist)}</div>
                    </div>
                </div>
            `).join('')}
            ${folder.songs.length > 3 ? `<div style="text-align:center; padding:8px; color:#007AFF; font-size:13px;">查看全部</div>` : ''}
        </div>
    `).join('');

    // 添加点击事件
    document.querySelectorAll('.favorite-song').forEach(item => {
        item.addEventListener('click', () => {
            playSong(item.dataset.songId);
        });
    });
}

// 分享歌曲给角色
function shareSongToChat() {
    if (!state.musicState.currentSong) {
        alert('请先播放一首歌曲');
        return;
    }

    if (!state.currentChatId) {
        alert('请先打开一个对话');
        return;
    }

    const song = state.musicState.currentSong;
    const message = `🎵 分享歌曲：${song.name}\n歌手：${song.artist}`;

    // 添加到当前聊天
    const chat = state.chats.find(c => c.id === state.currentChatId);
    if (chat) {
        chat.messages.push({
            role: 'user',
            content: message,
            timestamp: Date.now()
        });
        chat.updatedAt = Date.now();
        saveData();
        alert('歌曲已分享到当前对话');
    }
}

// 保存音乐数据
function saveMusicData() {
    localStorage.setItem('musicFavorites', JSON.stringify(state.musicState.favorites));
}

// 加载音乐数据
function loadMusicData() {
    const saved = localStorage.getItem('musicFavorites');
    if (saved) {
        state.musicState.favorites = JSON.parse(saved);
    }
}

// 获取天气信息
async function fetchWeather() {
    try {
        // 使用免费的天气API
        const response = await fetch('https://wttr.in/?format=j1');
        const data = await response.json();
        
        if (data && data.current_condition && data.current_condition[0]) {
            const current = data.current_condition[0];
            const temp = current.temp_C;
            const desc = current.lang_zh && current.lang_zh[0] ? current.lang_zh[0].value : current.weatherDesc[0].value;
            const location = data.nearest_area && data.nearest_area[0] 
                ? data.nearest_area[0].areaName[0].value + ', ' + data.nearest_area[0].region[0].value
                : '未知位置';
            
            elements.weatherTemp.textContent = `${temp}°C`;
            elements.weatherDesc.textContent = desc;
            elements.weatherLocation.textContent = location;
        }
    } catch (error) {
        console.error('获取天气失败:', error);
        elements.weatherTemp.textContent = '--°';
        elements.weatherDesc.textContent = '无法获取天气';
        elements.weatherLocation.textContent = '';
    }
}

// 初始化应用
init();
