var windowRef,changeSubscriptionDialog;function fnBeforeOpen(){document.getElementById("change-subscription-dialog").style.visibility="visible"}function fnOnClose(){$(".online-change-subscription").attr("license-service-url",""),$(".offline-change-subscription").attr("data-offlinelicense-url","").attr("data-tenant-type","")}function handleApplyLicense(e,i){var t,n;void 0!==i.originalEvent.data.isSuccess&&(!0===i.originalEvent.data.isSuccess?(t=null!=i.originalEvent.data.refreshtoken?i.originalEvent.data.refreshtoken:"",n=null!=i.originalEvent.data.boldLicenseToken&&null!=i.originalEvent.data.boldLicenseToken?i.originalEvent.data.boldLicenseToken:"",$.ajax({type:"POST",url:updateLicenseKeyUrl,data:{licenseKey:i.originalEvent.data.licenseKey,refreshToken:t,licenseType:"1",boldLicenseToken:n,currentUrl:window.location.origin},beforeSend:showWaitingPopup("server-app-container"),success:function(e){e.Status?(hideWaitingPopup("server-app-container"),SuccessAlert(window.TM.App.LocalizationContent.ManageLicense,window.TM.App.LocalizationContent.LicenseUpdated,7e3),window.location.reload()):(hideWaitingPopup("server-app-container"),WarningAlert(window.TM.App.LocalizationContent.ManageLicense,window.TM.App.LocalizationContent.LicenseUpdateFailed,e.Message,0))}})):!1===i.originalEvent.data.isSuccess&&WarningAlert(window.TM.App.LocalizationContent.ManageLicense,window.TM.App.LocalizationContent.LicenseUpdateFailed,0))}function checkWindowRef(e){windowRef.closed&&($("#update-onpremise-plan-bi").show(),$("#update-license-key-notification-loader-bi").hide(),$("#update-onpremise-plan-reports").show(),$("#update-license-key-notification-loader-reports").hide(),hideWaitingPopup("server-app-container"),clearInterval(timer))}function licenseWindow(e,i,t){void 0!==windowRef&&(clearInterval(timer),windowRef.close()),addButtonObj=e,$(window).off("message",$.proxy(handleApplyLicense,window,addButtonObj)),$(window).on("message",$.proxy(handleApplyLicense,window,addButtonObj)),showWaitingPopup("server-app-container"),windowRef=window.open(e.attr("license-service-url")+"&origin="+window.location.origin,"","height="+i,"width="+t),timer=setInterval($.proxy(checkWindowRef,500,addButtonObj))}$(document).ready(function(){null!=location.href.match(/boldbi/)?(history.pushState(null,"","?product=embedded-bi"),$("#bold-bi").tab("show")):null!=location.href.match(/boldreports/)?(history.pushState(null,"","?product=enterprise-reporting"),$("#bold-reports").tab("show")):null!=location.href.match(/embedded-bi/)?(history.pushState(null,"","?product=enterprise-bi"),$("#bold-bi").tab("show")):null!=location.href.match(/enterprise-reporting/)?(history.pushState(null,"","?product=enterprise-reporting"),$("#bold-reports").tab("show")):null==location.href.match(/boldbi/)&&null==location.href.match(/boldreports/)&&null==location.href.match(/boldbi/)&&null==location.href.match(/boldbi/)&&("true"==isBoldBiLicenseAvailable.toLowerCase()&&"true"==isBoldReportsLicenseAvailable.toLowerCase()||"true"==isBoldBiLicenseAvailable.toLowerCase()&&"false"==isBoldReportsLicenseAvailable.toLowerCase()?(history.pushState(null,"","?product=embedded-bi"),$("#bold-bi").tab("show")):"false"==isBoldBiLicenseAvailable.toLowerCase()&&"true"==isBoldReportsLicenseAvailable.toLowerCase()&&(history.pushState(null,"","?product=enterprise-reporting"),$("#bold-reports").tab("show"))),$("a[data-toggle='tab']").on("click",function(e){var i=window.location.search.toString();switch($(this).attr("id")){case"bold-bi":"?product=embedded-bi"===i&&"?product=boldbi"===i||history.pushState(null,"","?product=embedded-bi");break;case"bold-reports":"?product=enterprise-reporting"===i&&"?product=boldreports"===i||history.pushState(null,"","?product=enterprise-reporting")}}),(changeSubscriptionDialog=new ej.popups.Dialog({header:window.TM.App.LocalizationContent.EditSubscriptionDialogHeader,content:document.getElementById("change-subscription-dialog"),showCloseIcon:!0,width:"546px",height:"279px",isModal:!0,visible:!1,beforeOpen:fnBeforeOpen,animationSettings:{effect:"Zoom"},close:fnOnClose})).appendTo("#change-subscription-content"),$('[data-toggle="tooltip"]').tooltip(),isBoldBILicenseExpired&&($("#bold-bi-tab #details-information").css("padding-top","20px"),$("#change-subscription-content_title").html(window.TM.App.LocalizationContent.RenewSubscriptionDialogHeader)),isBoldReportsLicenseExpired&&($("#bold-reports-tab #details-information").css("padding-top","20px"),$("#change-subscription-content_title").html(window.TM.App.LocalizationContent.RenewSubscriptionDialogHeader))}),$(document).on("click","#change-subscription",function(){$(".online-change-subscription").attr("license-service-url",$(this).attr("license-service-url")+"&change_subscription=true"),$(".offline-change-subscription").attr("data-offlinelicense-url",$(this).attr("data-offlinelicense-url")).attr("data-tenant-type",$(this).attr("data-tenant-type")),$("#change-subscription-help").attr("href",$(this).attr("data-offlinelicense-url")),changeSubscriptionDialog.show()}),$(document).on("click",".edit-link",function(){$(".online-change-subscription").attr("license-service-url",$(this).attr("license-service-url")+"&change_subscription=true"),$(".offline-change-subscription").attr("data-offlinelicense-url",$(this).attr("data-offlinelicense-url")).attr("data-tenant-type",$(this).attr("data-tenant-type")),$("#change-subscription-help").attr("href",$(this).attr("data-offlinelicense-url")),changeSubscriptionDialog.show()}),$(document).on("click","#update-onpremise-plan-bi, #update-onpremise-plan-reports",function(e){$("#"+$(this).next("div").attr("id")).show(),$(this).hide(),licenseWindow($(this),600,500)}),$(document).on("click","#online-license-reports, #online-license-bi, .online-change-subscription",function(e){licenseWindow($(this),800,960)});