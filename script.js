document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quoteTextarea = document.getElementById('quote-text');
    const logoUpload = document.getElementById('logo-upload');
    const bgOptions = document.querySelectorAll('.bg-option');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    const textColorPicker = document.getElementById('text-color');
    const footerText = document.getElementById('footer-text');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const previewContainer = document.getElementById('preview-container');
    const previewText = document.getElementById('preview-text');
    const previewLogo = document.getElementById('preview-logo');
    const previewFooter = document.getElementById('preview-footer');
    
    // New Elements
    const textPosition = document.getElementById('text-position');
    const textAlign = document.getElementById('text-align');
    const logoSize = document.getElementById('logo-size');
    const logoOpacity = document.getElementById('logo-opacity');
    const logoPosition = document.getElementById('logo-position');
    const logoPadding = document.getElementById('logo-padding');
    const textShadow = document.getElementById('text-shadow');
    const watermark = document.getElementById('watermark');
    const overlay = document.getElementById('overlay');
    const roundedCorners = document.getElementById('rounded-corners');
    
    // New Elements for Text Spacing and Effects
    const lineHeight = document.getElementById('line-height');
    const letterSpacing = document.getElementById('letter-spacing');
    const fontFamily = document.getElementById('font-family');
    const fontWeight = document.getElementById('font-weight');
    const brightness = document.getElementById('brightness');
    const contrast = document.getElementById('contrast');
    const saturation = document.getElementById('saturation');
    const blur = document.getElementById('blur');
    const gradientOverlay = document.getElementById('gradient-overlay');
    const textureOverlay = document.getElementById('texture-overlay');
    
    // New Elements for Templates and Effects
    const templateButtons = document.querySelectorAll('[id^="template-"]');
    const colorSchemes = document.querySelectorAll('.color-scheme');
    const quickFilters = document.querySelectorAll('.quick-filter');
    const autoResize = document.getElementById('auto-resize');
    const textBalance = document.getElementById('text-balance');
    
    // Template quotes
    const templates = {
        motivational: {
            text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
            style: { fontWeight: 'bold', letterSpacing: '1px' }
        },
        business: {
            text: "The best way to predict the future is to create it.",
            style: { fontWeight: 'normal', letterSpacing: '0px' }
        },
        wisdom: {
            text: "The journey of a thousand miles begins with a single step.",
            style: { fontWeight: 'light', letterSpacing: '2px' }
        },
        nature: {
            text: "In every walk with nature one receives far more than he seeks.",
            style: { fontWeight: 'normal', letterSpacing: '1px' }
        }
    };

    // Quick filter presets
    const filterPresets = {
        none: {
            brightness: 1,
            contrast: 1,
            saturation: 1.4,
            blur: 0
        },
        vintage: {
            brightness: 1.1,
            contrast: 0.9,
            saturation: 0.7,
            blur: 0.5
        },
        dramatic: {
            brightness: 0.9,
            contrast: 1.4,
            saturation: 1.3,
            blur: 0
        },
        soft: {
            brightness: 1.1,
            contrast: 0.9,
            saturation: 0.9,
            blur: 1
        }
    };
    
    // Initialize UI with animations
    initUI();
    
    // Event Listeners for new features
    textPosition.addEventListener('change', updateTextPosition);
    textAlign.addEventListener('change', updateTextAlignment);
    logoSize.addEventListener('input', updateLogoSize);
    logoOpacity.addEventListener('input', updateLogoOpacity);
    logoPosition.addEventListener('change', updateLogoPosition);
    logoPadding.addEventListener('input', updateLogoPadding);
    textShadow.addEventListener('change', updateTextShadow);
    watermark.addEventListener('change', updateWatermark);
    overlay.addEventListener('change', updateOverlay);
    roundedCorners.addEventListener('change', updateRoundedCorners);
    lineHeight.addEventListener('input', updateLineHeight);
    letterSpacing.addEventListener('input', updateLetterSpacing);
    fontFamily.addEventListener('change', updateFontFamily);
    fontWeight.addEventListener('change', updateFontWeight);
    brightness.addEventListener('input', updateImageEffects);
    contrast.addEventListener('input', updateImageEffects);
    saturation.addEventListener('input', updateImageEffects);
    blur.addEventListener('input', updateImageEffects);
    gradientOverlay.addEventListener('change', updateOverlayEffects);
    textureOverlay.addEventListener('change', updateOverlayEffects);
    templateButtons.forEach(button => {
        button.addEventListener('click', applyTemplate);
    });
    colorSchemes.forEach(scheme => {
        scheme.addEventListener('click', applyColorScheme);
    });
    quickFilters.forEach(filter => {
        filter.addEventListener('click', applyQuickFilter);
    });
    autoResize.addEventListener('change', handleAutoResize);
    textBalance.addEventListener('change', handleTextBalance);
    
    // Existing event listeners
    quoteTextarea.addEventListener('input', updatePreview);
    fontSizeSlider.addEventListener('input', updateFontSize);
    textColorPicker.addEventListener('input', updateTextColor);
    footerText.addEventListener('input', updateFooterText);
    logoUpload.addEventListener('change', handleLogoUpload);
    generateBtn.addEventListener('click', generateImage);
    downloadBtn.addEventListener('click', downloadImage);
    
    // Background selection
    bgOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            bgOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            this.classList.add('active');
            
            // Get background class
            const bgClass = this.getAttribute('data-bg');
            
            // Remove all bg classes from preview container
            previewContainer.className = '';
            
            // Add new bg class and default classes
            previewContainer.classList.add(
                bgClass, 
                'relative', 
                'rounded-lg', 
                'flex', 
                'items-center', 
                'justify-center',
                'overflow-hidden'
            );
            
            // Add inline style for min-height
            previewContainer.style.minHeight = '500px';
        });
    });
    
    // Functions
    function initUI() {
        // Add entrance animations
        document.querySelectorAll('.bg-option').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            setTimeout(() => {
                el.style.transition = 'all 0.3s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
        
        // Initialize preview
        updatePreview();
        updateFontSize();
        updateTextColor();
        updateFooterText();
        
        // Add gaming-style button effects
        document.querySelectorAll('button').forEach(btn => {
            btn.classList.add('btn-glow');
        });
        
        // Set default logo
        previewLogo.src = 'default.png';
        previewLogo.classList.remove('hidden');
        previewLogo.style.opacity = '1';
        previewLogo.style.transform = 'scale(1)';
        previewLogo.onerror = function() {
            // If default logo fails to load, hide the logo container
            previewLogo.classList.add('hidden');
        };
        
        // Initialize new features
        updateLineHeight();
        updateLetterSpacing();
        updateFontFamily();
        updateFontWeight();
        updateImageEffects();
        updateOverlayEffects();
        handleTextBalance();
        if (autoResize.checked) {
            handleAutoResize();
        }
    }
    
    function updatePreview() {
        previewText.textContent = quoteTextarea.value || 'Your motivational quote will appear here...';
    }
    
    function updateFontSize() {
        const size = fontSizeSlider.value;
        fontSizeValue.textContent = `${size}px`;
        previewText.style.fontSize = `${size}px`;
    }
    
    function updateTextColor() {
        const color = textColorPicker.value;
        previewText.style.color = color;
    }
    
    function updateFooterText() {
        previewFooter.textContent = footerText.value;
    }
    
    function handleLogoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                previewLogo.src = event.target.result;
                previewLogo.classList.remove('hidden');
                
                // Add entrance animation for logo
                previewLogo.style.opacity = '0';
                previewLogo.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    previewLogo.style.transition = 'all 0.3s ease';
                    previewLogo.style.opacity = '1';
                    previewLogo.style.transform = 'scale(1)';
                }, 100);
            };
            
            reader.readAsDataURL(file);
        } else {
            // If no file is selected, revert to default logo
            previewLogo.src = 'default.png';
            previewLogo.classList.remove('hidden');
        }
    }
    
    function generateImage() {
        // Add loading effect
        generateBtn.innerHTML = '<span class="animate-pulse">Generating...</span>';
        generateBtn.disabled = true;
        
        setTimeout(() => {
            // Visual feedback animation
            previewContainer.style.transform = 'scale(0.98)';
            previewContainer.style.boxShadow = '0 0 20px rgba(123, 97, 255, 0.7)';
            previewContainer.style.transition = 'all 0.3s ease';
            
            setTimeout(() => {
                previewContainer.style.transform = 'scale(1)';
                generateBtn.innerHTML = 'Generate Image';
                generateBtn.disabled = false;
                
                // Notification
                showNotification('Image generated successfully!');
            }, 500);
        }, 1000);
    }
    
    function downloadImage() {
        // Add loading effect
        downloadBtn.innerHTML = '<span class="animate-pulse">Processing...</span>';
        downloadBtn.disabled = true;

        // Get selected ratio
        const ratio = document.getElementById('image-ratio').value;
        const ratioConfig = {
            'square': { width: 1080, height: 1080 }, // Instagram Square
            'portrait': { width: 1080, height: 1350 }, // Instagram Portrait
            'landscape': { width: 1200, height: 630 }, // Facebook/Twitter Landscape
            'story': { width: 1080, height: 1920 }, // Instagram/Facebook Story
            'original': null, // Original container size
            'preview': null // Exactly as in preview
        };

        // Configure canvas size based on selected ratio
        const config = {
            useCORS: true,
            scale: 2,
            allowTaint: true,
            backgroundColor: null, // Preserve transparency
            removeContainer: false // Keep container for effects
        };

        // Store original dimensions
        const originalWidth = previewContainer.offsetWidth;
        const originalHeight = previewContainer.offsetHeight;
        const originalStyle = previewContainer.style.cssText;

        if (ratio === 'preview' || ratio === 'original') {
            // For preview and original size, use current dimensions
            html2canvas(previewContainer, config).then(canvas => {
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = `motivational-quote-${ratio}.png`;
                link.click();
                
                // Reset button
                downloadBtn.innerHTML = 'Download Image';
                downloadBtn.disabled = false;
                
                showNotification('Image downloaded successfully!');
            }).catch(err => {
                console.error('Error generating image:', err);
                downloadBtn.innerHTML = 'Download Image';
                downloadBtn.disabled = false;
                showNotification('Error downloading image', true);
            });
        } else {
            const selectedRatio = ratioConfig[ratio];
            // Set temporary dimensions for the preview container
            previewContainer.style.width = selectedRatio.width / 2 + 'px';
            previewContainer.style.height = selectedRatio.height / 2 + 'px';
            
            // Generate image
            html2canvas(previewContainer, config).then(canvas => {
                // Restore original dimensions
                previewContainer.style.cssText = originalStyle;
                previewContainer.style.width = originalWidth + 'px';
                previewContainer.style.height = originalHeight + 'px';
                
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = image;
                link.download = `motivational-quote-${ratio}.png`;
                link.click();
                
                // Reset button
                downloadBtn.innerHTML = 'Download Image';
                downloadBtn.disabled = false;
                
                showNotification('Image downloaded successfully!');
            }).catch(err => {
                console.error('Error generating image:', err);
                previewContainer.style.cssText = originalStyle;
                previewContainer.style.width = originalWidth + 'px';
                previewContainer.style.height = originalHeight + 'px';
                downloadBtn.innerHTML = 'Download Image';
                downloadBtn.disabled = false;
                showNotification('Error downloading image', true);
            });
        }
    }
    
    // Add Quick Download button functionality
    const quickDownloadBtn = document.createElement('button');
    quickDownloadBtn.id = 'quick-download-btn';
    quickDownloadBtn.className = 'mt-4 w-full text-white bg-gradient-to-br from-pink-400 to-purple-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-3 text-center';
    quickDownloadBtn.innerHTML = 'Quick Download (As Preview)';
    quickDownloadBtn.onclick = function() {
        document.getElementById('image-ratio').value = 'preview';
        downloadImage();
    };

    // Insert Quick Download button after the regular download button
    downloadBtn.parentNode.insertBefore(quickDownloadBtn, downloadBtn.nextSibling);
    
    // Helper: Show notification
    function showNotification(message, isError = false) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white ${isError ? 'bg-red-500' : 'bg-green-500'} shadow-lg z-50 transform transition-all duration-300 ease-in-out`;
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        // Add content
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="mr-2">${isError ? '❌' : '✅'}</span>
                <span>${message}</span>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Mobile device optimization
    function setupMobileOptimization() {
        // Check if device is mobile
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Adjust font size slider range
            fontSizeSlider.min = "14";
            fontSizeSlider.max = "28";
            fontSizeSlider.value = "18";
            updateFontSize();
            
            // Adjust preview container height
            previewContainer.style.minHeight = '350px';
        }
    }
    
    // Call mobile optimization on load and resize
    setupMobileOptimization();
    window.addEventListener('resize', setupMobileOptimization);

    // New Functions for Position and Advanced Features
    function updateTextPosition() {
        const position = textPosition.value;
        const previewContent = document.getElementById('preview-content');
        previewContent.style.display = 'flex';
        previewContent.style.flexDirection = 'column';
        
        switch(position) {
            case 'top':
                previewContent.style.justifyContent = 'flex-start';
                break;
            case 'center':
                previewContent.style.justifyContent = 'center';
                break;
            case 'bottom':
                previewContent.style.justifyContent = 'flex-end';
                break;
        }
    }

    function updateTextAlignment() {
        previewText.style.textAlign = textAlign.value;
    }

    function updateLogoSize() {
        const size = logoSize.value;
        document.getElementById('logo-size-value').textContent = size + 'px';
        previewLogo.style.maxHeight = size + 'px';
    }

    function updateLogoOpacity() {
        const opacity = logoOpacity.value;
        document.getElementById('logo-opacity-value').textContent = opacity + '%';
        previewLogo.style.opacity = opacity / 100;
    }

    function updateLogoPadding() {
        const padding = logoPadding.value;
        document.getElementById('logo-padding-value').textContent = padding + 'px';
        document.getElementById('logo-container').style.padding = padding + 'px';
    }

    function updateLogoPosition() {
        const position = logoPosition.value;
        const logoContainer = document.getElementById('logo-container');
        logoContainer.style.position = 'absolute';
        
        switch(position) {
            case 'top':
                logoContainer.style.top = logoPadding.value + 'px';
                logoContainer.style.left = '50%';
                logoContainer.style.transform = 'translateX(-50%)';
                break;
            case 'bottom':
                logoContainer.style.bottom = logoPadding.value + 'px';
                logoContainer.style.left = '50%';
                logoContainer.style.transform = 'translateX(-50%)';
                break;
            case 'center':
                logoContainer.style.top = '50%';
                logoContainer.style.left = '50%';
                logoContainer.style.transform = 'translate(-50%, -50%)';
                break;
            case 'top-left':
                logoContainer.style.top = logoPadding.value + 'px';
                logoContainer.style.left = logoPadding.value + 'px';
                logoContainer.style.transform = 'none';
                break;
            case 'top-right':
                logoContainer.style.top = logoPadding.value + 'px';
                logoContainer.style.right = logoPadding.value + 'px';
                logoContainer.style.transform = 'none';
                break;
            case 'bottom-left':
                logoContainer.style.bottom = logoPadding.value + 'px';
                logoContainer.style.left = logoPadding.value + 'px';
                logoContainer.style.transform = 'none';
                break;
            case 'bottom-right':
                logoContainer.style.bottom = logoPadding.value + 'px';
                logoContainer.style.right = logoPadding.value + 'px';
                logoContainer.style.transform = 'none';
                break;
        }
    }

    function updateTextShadow() {
        if (textShadow.checked) {
            previewText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
        } else {
            previewText.style.textShadow = 'none';
        }
    }

    function updateWatermark() {
        const watermarkElement = document.getElementById('watermark-text') || document.createElement('div');
        watermarkElement.id = 'watermark-text';
        
        if (watermark.checked) {
            watermarkElement.textContent = '© Image Maker Tool';
            watermarkElement.style.position = 'absolute';
            watermarkElement.style.bottom = '10px';
            watermarkElement.style.right = '10px';
            watermarkElement.style.fontSize = '12px';
            watermarkElement.style.opacity = '0.5';
            previewContainer.appendChild(watermarkElement);
        } else {
            watermarkElement.remove();
        }
    }

    function updateOverlay() {
        const overlayElement = document.getElementById('dark-overlay') || document.createElement('div');
        overlayElement.id = 'dark-overlay';
        
        if (overlay.checked) {
            overlayElement.style.position = 'absolute';
            overlayElement.style.top = '0';
            overlayElement.style.left = '0';
            overlayElement.style.width = '100%';
            overlayElement.style.height = '100%';
            overlayElement.style.backgroundColor = 'rgba(0,0,0,0.3)';
            overlayElement.style.pointerEvents = 'none';
            previewContainer.appendChild(overlayElement);
        } else {
            overlayElement.remove();
        }
    }

    function updateRoundedCorners() {
        if (roundedCorners.checked) {
            previewContainer.style.borderRadius = '20px';
        } else {
            previewContainer.style.borderRadius = '8px';
        }
    }

    // Text Spacing Functions
    function updateLineHeight() {
        const value = lineHeight.value;
        document.getElementById('line-height-value').textContent = value + 'x';
        previewText.style.lineHeight = value;
    }

    function updateLetterSpacing() {
        const value = letterSpacing.value;
        document.getElementById('letter-spacing-value').textContent = value + 'px';
        previewText.style.letterSpacing = value + 'px';
    }

    function updateFontFamily() {
        const font = fontFamily.value;
        previewText.style.fontFamily = font;
        // Dynamically load font if not already loaded
        if (!document.fonts.check(`12px ${font}`)) {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}:wght@400;700&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }

    function updateFontWeight() {
        previewText.style.fontWeight = fontWeight.value;
    }

    // Image Effect Functions
    function updateImageEffects() {
        const brightnessVal = brightness.value;
        const contrastVal = contrast.value;
        const saturationVal = saturation.value;
        const blurVal = blur.value;
        
        document.getElementById('brightness-value').textContent = Math.round(brightnessVal * 100) + '%';
        document.getElementById('contrast-value').textContent = Math.round(contrastVal * 100) + '%';
        document.getElementById('saturation-value').textContent = Math.round(saturationVal * 100) + '%';
        document.getElementById('blur-value').textContent = blurVal + 'px';
        
        previewContainer.style.filter = `
            brightness(${brightnessVal})
            contrast(${contrastVal})
            saturate(${saturationVal})
            blur(${blurVal}px)
        `;
    }

    function updateOverlayEffects() {
        // Remove existing overlays
        const existingOverlays = previewContainer.querySelectorAll('.overlay-effect');
        existingOverlays.forEach(overlay => overlay.remove());
        
        // Add gradient overlay if checked
        if (gradientOverlay.checked) {
            const gradientElement = document.createElement('div');
            gradientElement.className = 'overlay-effect absolute inset-0 pointer-events-none';
            gradientElement.style.background = 'linear-gradient(45deg, rgba(0,0,0,0.2), rgba(255,255,255,0.1))';
            previewContainer.appendChild(gradientElement);
        }
        
        // Add texture overlay if checked
        if (textureOverlay.checked) {
            const textureElement = document.createElement('div');
            textureElement.className = 'overlay-effect absolute inset-0 pointer-events-none';
            textureElement.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="%23000" fill-opacity=".05"/%3E%3C/svg%3E")';
            textureElement.style.opacity = '0.3';
            previewContainer.appendChild(textureElement);
        }
    }

    // Template Functions
    function applyTemplate(e) {
        const templateType = e.target.id.replace('template-', '');
        const template = templates[templateType];
        
        if (template) {
            quoteTextarea.value = template.text;
            Object.assign(previewText.style, template.style);
            updatePreview();
        }
    }

    // Color Scheme Functions
    function applyColorScheme(e) {
        const colors = JSON.parse(e.currentTarget.dataset.colors);
        previewContainer.style.backgroundColor = colors.bg;
        previewText.style.color = colors.text;
    }

    // Quick Filter Functions
    function applyQuickFilter(e) {
        const filterType = e.target.dataset.filter;
        const preset = filterPresets[filterType];
        
        if (preset) {
            brightness.value = preset.brightness;
            contrast.value = preset.contrast;
            saturation.value = preset.saturation;
            blur.value = preset.blur;
            updateImageEffects();
        }
    }

    // Smart Text Functions
    function handleAutoResize() {
        if (autoResize.checked) {
            const containerHeight = previewContainer.clientHeight;
            const containerWidth = previewContainer.clientWidth;
            const textLength = previewText.textContent.length;
            
            // Calculate optimal font size based on container size and text length
            const optimalSize = Math.min(
                Math.floor(containerWidth / (textLength * 0.5)),
                Math.floor(containerHeight / 4)
            );
            
            fontSizeSlider.value = Math.min(Math.max(optimalSize, 16), 32);
            updateFontSize();
        }
    }

    function handleTextBalance() {
        if (textBalance.checked) {
            previewText.style.textAlign = 'justify';
            previewText.style.hyphens = 'auto';
        } else {
            previewText.style.textAlign = textAlign.value;
            previewText.style.hyphens = 'none';
        }
    }
}); 