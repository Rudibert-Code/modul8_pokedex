function showLoadingSpinner(){
    document.getElementById('loading').showModal();
    document.documentElement.classList.add("scroll-stopper");
}

const loadingTime = setTimeout(closeLoadingScreen, 10000);

function closeLoadingScreen(){ 
    document.getElementById('loading').close();
    document.documentElement.classList.remove("scroll-stopper");
}